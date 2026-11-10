import { test } from "node:test"
import assert from "node:assert/strict"
import { containerLoad, CONTAINERS } from "./calc.ts"

const near = (a: number, b: number, tol = 0.05) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`)
const carton = { length: 500, width: 400, height: 300, weight: 20 }

test("guide example: 50 x 40 x 30 cm, 20 kg, in a 20ft with rotation = 392 cartons", () => {
    const r = containerLoad({ container: CONTAINERS["20ft"], loadType: "loose", canRotate: true, carton })!
    assert.equal(r.units, 392)
    assert.equal(r.arrangement, "14L × 4W × 7H")
    near(r.totalWeight, 7840)
    near(r.utilization, 70.8)
    assert.equal(r.limitedBy, "space")
})

test("20ft payload is Hapag-Lloyd's 28,130 kg", () => {
    assert.equal(CONTAINERS["20ft"].maxWeight, 28130)
})

test("weight limit cuts the count", () => {
    const r = containerLoad({ container: CONTAINERS["20ft"], loadType: "loose", canRotate: true, carton: { ...carton, weight: 100 } })!
    assert.equal(r.units, 281)
    assert.equal(r.limitedBy, "weight")
})

test("no carton weight means space only", () => {
    const r = containerLoad({ container: CONTAINERS["20ft"], loadType: "loose", canRotate: true, carton: { ...carton, weight: 0 } })!
    assert.equal(r.units, 392)
    assert.equal(r.totalWeight, 0)
})

test("pallet weight counts toward the payload", () => {
    const pallet = { length: 1200, width: 800, height: 150, weight: 0 }
    const heavy = { ...carton, weight: 60 }
    const without = containerLoad({ container: CONTAINERS["20ft"], loadType: "pallet", canRotate: true, carton: heavy, pallet })!
    const withPallet = containerLoad({ container: CONTAINERS["20ft"], loadType: "pallet", canRotate: true, carton: heavy, pallet: { ...pallet, weight: 25 } })!
    assert.equal(without.boxesPerPallet, 28)
    near(withPallet.totalWeight - without.totalWeight * (withPallet.palletsCount / without.palletsCount), withPallet.palletsCount * 25)
    assert.ok(withPallet.palletsCount <= without.palletsCount)
})

test("blank or zero sizes give no result", () => {
    assert.equal(containerLoad({ container: CONTAINERS["20ft"], loadType: "loose", canRotate: true, carton: { ...carton, height: 0 } }), null)
    assert.equal(containerLoad({ container: CONTAINERS.custom, loadType: "loose", canRotate: true, carton }), null)
    assert.equal(containerLoad({ container: CONTAINERS["20ft"], loadType: "pallet", canRotate: true, carton }), null)
})

test("carton bigger than the container fits 0", () => {
    const r = containerLoad({ container: CONTAINERS["20ft"], loadType: "loose", canRotate: true, carton: { length: 3000, width: 3000, height: 3000, weight: 0 } })!
    assert.equal(r.units, 0)
    assert.equal(r.noFit, true)
})

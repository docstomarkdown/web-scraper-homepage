import { test } from "node:test"
import assert from "node:assert/strict"
import { inventoryTurnover, stockRunway, stockOutDate } from "./calc.ts"

const near = (a: number, b: number, eps = 0.005) => Math.abs(a - b) < eps

test("guide example: $150,000 COGS, $25,000 to $35,000 over a year", () => {
    const r = inventoryTurnover({ cogs: 150000, openingInventory: 25000, closingInventory: 35000 })!
    assert.equal(r.averageInventory, 30000)
    assert.equal(r.turnover, 5)
    assert.equal(r.daysOfInventory, 73)
    assert.equal(r.annualTurnover, 5)
})

test("a 30-day period: turns scale to a year", () => {
    const r = inventoryTurnover({ cogs: 12500, openingInventory: 25000, closingInventory: 35000, periodDays: 30 })!
    assert.ok(near(r.turnover, 0.4167))
    assert.ok(near(r.daysOfInventory, 72))
    assert.ok(near(r.annualTurnover, 5.07))
})

test("opening inventory 0 halves the closing value (used to use closing alone)", () => {
    const r = inventoryTurnover({ cogs: 60000, openingInventory: 0, closingInventory: 30000 })!
    assert.equal(r.averageInventory, 15000)
    assert.equal(r.turnover, 4)
})

test("blank or zero turnover inputs give no result", () => {
    assert.equal(inventoryTurnover({ cogs: null, openingInventory: null, closingInventory: null }), null)
    assert.equal(inventoryTurnover({ cogs: 1000, openingInventory: 0, closingInventory: 0 }), null)
    assert.equal(inventoryTurnover({ cogs: 1000, openingInventory: 10, closingInventory: 10, periodDays: 0 }), null)
})

test("runway example: 5,000 units at 150 a day, 500 buffer, 21-day lead time", () => {
    const r = stockRunway({ stock: 5000, unitsSold: 150, salesPeriodDays: 1, safetyStock: 500, leadTimeDays: 21 })!
    assert.equal(Math.floor(r.daysRemaining), 33)
    assert.equal(Math.floor(r.usableDays), 30)
    assert.equal(r.orderWithinDays, 9)
})

test("runway from monthly sales uses the days entered, not a fixed 30", () => {
    const r = stockRunway({ stock: 3100, unitsSold: 3100, salesPeriodDays: 31 })!
    assert.equal(r.dailySales, 100)
    assert.equal(r.daysRemaining, 31)
    assert.equal(r.orderWithinDays, null)
})

test("blank runway inputs give no result", () => {
    assert.equal(stockRunway({ stock: null, unitsSold: null, salesPeriodDays: null }), null)
    assert.equal(stockRunway({ stock: 100, unitsSold: 0, salesPeriodDays: 1 }), null)
})

test("extreme runway gives no date instead of Invalid Date", () => {
    const r = stockRunway({ stock: 1000000, unitsSold: 0.01, salesPeriodDays: 365 })!
    assert.equal(stockOutDate(new Date(2026, 0, 1), r.daysRemaining), null)
    const d = stockOutDate(new Date(2026, 0, 1), 33.3)!
    assert.equal(d.getDate(), 3)
    assert.equal(d.getMonth(), 1)
})

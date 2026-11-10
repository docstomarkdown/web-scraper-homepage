"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, AlertTriangle, BarChart2, Calendar, DollarSign } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, FadeIn } from "@/app/tools/_shared/components"
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard"
import { SalesVelocityBreakdown } from "./SalesVelocityBreakdown"
import { salesVelocity } from "./calc"

export function SalesVelocityCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [unitsSold, setUnitsSold] = useState<number | "">("")
    const [periodDays, setPeriodDays] = useState<number | "">("")
    const [outOfStockDays, setOutOfStockDays] = useState<number | "">("")
    const [price, setPrice] = useState<number | "">("")

    const handleReset = () => {
        setUnitsSold("")
        setPeriodDays("")
        setOutOfStockDays("")
        setPrice("")
    }

    const n = (v: number | "") => (v === "" ? null : v)
    const result = salesVelocity({ unitsSold: n(unitsSold), periodDays: n(periodDays), outOfStockDays: n(outOfStockDays), price: n(price) })
    const isCalculated = result.ok
    const rawVelocity = result.ok ? result.rawVelocity : 0
    const trueVelocity = result.ok ? result.trueVelocity : 0
    const monthlyRunRate = result.ok ? result.monthlyRunRate : 0
    const revenueRunRate = result.ok ? result.monthlyRevenue ?? 0 : 0
    const oosDays = outOfStockDays === "" ? 0 : outOfStockDays

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(val)
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            title="Sales History"
                            description="Enter sales history and stockout details."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            onReset={handleReset}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <CalculatorInput
                                label="Total Units Sold"
                                value={unitsSold}
                                onChange={setUnitsSold}
                                placeholder="300"
                                tooltip="Units sold during selected period."
                            />
                            <CalculatorInput
                                label="Period Length (Days)"
                                value={periodDays}
                                onChange={setPeriodDays}
                                placeholder="30"
                                tooltip="Timeframe you rely on (e.g., last 30 days)."
                            />
                            <CalculatorInput
                                label="Days Out of Stock"
                                value={outOfStockDays}
                                onChange={setOutOfStockDays}
                                placeholder="5"
                                tooltip="Days the product could not be bought. Must be fewer than the period length."
                                hint={!result.ok && result.reason === "no-days-in-stock" ? "Out-of-stock days must be fewer than the period length, so there are days left to divide by." : undefined}
                                isOptional
                            />
                            <CalculatorInput
                                label={`Selling Price`}
                                isOptional
                                value={price}
                                onChange={setPrice}
                                placeholder="25.00"
                                currency={currency}
                                step={0.01}
                                tooltip="Unit price for revenue calculation."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        primaryResult={{
                            value: trueVelocity.toFixed(1),
                            unit: "/ Day",
                            label: "True Sales Velocity",
                            key: "trueVelocity",
                        }}
                        secondaryResults={[
                            {
                                key: "rawVelocity",
                                label: "Raw Daily Average",
                                value: rawVelocity.toFixed(1),
                                unit: "/ Day",
                                tooltip: "Unadjusted sales per day over the period.",
                                icon: BarChart2
                            },
                            {
                                key: "monthlyRunRate",
                                label: "Monthly Run Rate",
                                value: monthlyRunRate.toLocaleString(undefined, { maximumFractionDigits: 1 }),
                                unit: "Units",
                                tooltip: "Projected monthly unit sales if perfectly in stock.",
                                icon: Calendar
                            }
                        ]}
                        isCalculated={isCalculated}
                        emptyMessage="True Sales Velocity"
                        liveBadgeText={
                            oosDays > 0
                                ? "Stockout Adjusted"
                                : "Fully In Stock"
                        }
                        liveBadgeColor="slate"
                    >
                        {/* Information inside the card */}
                        <div className="flex flex-col gap-3">
                            {/* Forecasting Insight Card */}
                            <div className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 dark:bg-slate-900 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0 dark:text-blue-400" />
                                    <span className="text-sm sm:text-[14px] font-bold text-slate-600 dark:text-slate-300">Forecasting Insight</span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed pl-6 dark:text-slate-300">
                                    {oosDays > 0 ? (
                                        <>
                                            You were out of stock for <strong>{oosDays} days</strong>. If you had been in stock, you likely would have sold <strong>{result.ok ? result.lostUnits.toLocaleString(undefined, { maximumFractionDigits: 1 }) : 0} more units</strong>. Use the <strong>{trueVelocity.toFixed(1)}/day</strong> rate for future reordering.
                                        </>
                                    ) : (
                                        <>
                                            No stockouts recorded. Your sales velocity is steady at <strong>{rawVelocity.toFixed(1)} units/day</strong>.
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* Revenue Card */}
                            {result.ok && result.monthlyRevenue !== null && (
                                <div className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 dark:bg-slate-900 dark:border-slate-800">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4 text-blue-500 flex-shrink-0 dark:text-blue-400" />
                                        <span className="text-sm sm:text-[14px] font-bold text-slate-600 dark:text-slate-300">Projected Monthly Revenue</span>
                                    </div>
                                    <div className="pl-6 flex items-baseline gap-1.5">
                                        <span className="text-[16px] sm:text-[17px] font-bold tracking-tight text-slate-700 dark:text-slate-200">
                                            <Counter value={revenueRunRate} formatter={formatCurrency} key={currency} />
                                        </span>
                                        <span className="text-[0.6em] font-medium text-slate-600 dark:text-slate-300 ml-1">/ mo</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ResultSummaryCard>

                    {/* Breakdown Chart */}
                    <FadeIn delay={0.1}>
                        <SalesVelocityBreakdown
                            rawVelocity={rawVelocity}
                            trueVelocity={trueVelocity}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}
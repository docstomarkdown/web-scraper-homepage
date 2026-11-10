"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, TrendingUp, Scale, MousePointerClick } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
import { cacFromTotals, cacFromCpc, ltvToCac, compareToTarget } from "./calc"

export function CACCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [mode, setMode] = useState<"totals" | "estimate">("totals")
    const [expenses, setExpenses] = useState<number | "">("")
    const [customers, setCustomers] = useState<number | "">("")
    const [cpc, setCpc] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")
    const [ltv, setLtv] = useState<number | "">("")
    const [target, setTarget] = useState<number | "">("")

    const handleReset = () => {
        setExpenses("")
        setCustomers("")
        setCpc("")
        setConversionRate("")
        setLtv("")
        setTarget("")
        setMode("totals")
    }

    const cac = mode === "totals" ? cacFromTotals(expenses, customers) : cacFromCpc(cpc, conversionRate)
    const ratio = ltvToCac(ltv, cac)
    const targetStatus = compareToTarget(cac, target)
    const isValid = cac !== null

    // A verdict only from the reader's own numbers: a target, or the customer's lifetime value.
    let badgeText = ""
    let badgeColor: "emerald" | "amber" | "rose" | "slate" = "slate"
    if (targetStatus === "within") { badgeText = "Within target"; badgeColor = "emerald" }
    else if (targetStatus === "over") { badgeText = "Over target"; badgeColor = "rose" }
    else if (ratio !== null) {
        if (ratio >= 3) { badgeText = "LTV:CAC 3:1 or better"; badgeColor = "emerald" }
        else if (ratio >= 1) { badgeText = "LTV:CAC below 3:1"; badgeColor = "amber" }
        else { badgeText = "Costs more than it earns"; badgeColor = "rose" }
    }

    const modeButton = (value: "totals" | "estimate", label: string) => (
        <button
            type="button"
            onClick={() => setMode(value)}
            aria-pressed={mode === value}
            className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${mode === value
                ? "bg-white border-blue-200 text-blue-700 shadow-sm ring-1 ring-blue-100 dark:bg-slate-900 dark:border-blue-900/50 dark:text-blue-300"
                : "bg-transparent border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
        >
            {label}
        </button>
    )

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section — Sticky */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-3xl dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your costs and new customers, or a cost per click and conversion rate."
                            onReset={handleReset}
                            guideId="cac-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 grid grid-cols-2 gap-2 dark:bg-slate-800/60 dark:border-slate-800">
                                    {modeButton("totals", "From totals")}
                                    {modeButton("estimate", "From CPC")}
                                </div>
                                {mode === "totals" ? (
                                    <div className="space-y-3">
                                        <CalculatorInput
                                            label="Total Sales & Marketing Costs"
                                            value={expenses}
                                            onChange={setExpenses}
                                            isCurrency
                                            currency={currency}
                                            placeholder="12000.00"
                                            max={10000000}
                                            tooltip="Everything spent to win customers: ad spend, salaries, commissions, tools. For CPA, enter ad spend only."
                                            groupingTitle="Spend & Volume"
                                            groupingIcon={TrendingUp}
                                        />
                                        <CalculatorInput
                                            label="New Customers Acquired"
                                            value={customers}
                                            onChange={setCustomers}
                                            placeholder="300"
                                            max={1000000}
                                            tooltip="New customers (or conversions, for CPA) in the same period."
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <CalculatorInput
                                            label="Cost Per Click"
                                            value={cpc}
                                            onChange={setCpc}
                                            isCurrency
                                            currency={currency}
                                            placeholder="1.25"
                                            step={0.01}
                                            tooltip="The average cost of one click."
                                            groupingTitle="Estimate"
                                            groupingIcon={MousePointerClick}
                                        />
                                        <CalculatorInput
                                            label="Conversion Rate"
                                            suffix="%"
                                            value={conversionRate}
                                            onChange={setConversionRate}
                                            placeholder="2.5"
                                            max={100}
                                            step={0.1}
                                            tooltip="The share of clicks that become a customer or conversion."
                                        />
                                    </div>
                                )}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Customer Lifetime Value"
                                        value={ltv}
                                        onChange={setLtv}
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                        placeholder="120.00"
                                        tooltip="The profit a customer brings over their lifetime. Used for the LTV:CAC ratio."
                                        groupingTitle="Compare"
                                        groupingIcon={Scale}
                                    />
                                    <CalculatorInput
                                        label="Target CAC"
                                        value={target}
                                        onChange={setTarget}
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                        placeholder="50.00"
                                        tooltip="The most you can afford per customer or conversion. The result shows whether you're within it."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section — Scrollable */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="CAC"
                        showLiveBadge={badgeText !== ""}
                        liveBadgeText={badgeText}
                        liveBadgeColor={badgeColor}
                        description={mode === "totals" ? "Costs divided by new customers." : "Cost per click divided by the conversion rate."}
                        primaryResult={{
                            value: cac ?? 0,
                            label: "Customer Acquisition Cost",
                            isCurrency: true,
                            key: "cac"
                        }}
                        secondaryResults={[
                            {
                                key: "ltvCac",
                                label: "LTV:CAC Ratio",
                                value: ratio !== null ? `${ratio.toFixed(2)} : 1` : "—",
                                icon: Users,
                                tooltip: ratio !== null ? "Customer lifetime value divided by CAC." : "Enter customer lifetime value to see this."
                            },
                            {
                                key: "target",
                                label: "Against Target",
                                value: targetStatus === "within" ? "Within target" : targetStatus === "over" ? "Over target" : "—",
                                icon: Target,
                                tooltip: targetStatus !== null ? "CAC at or under your target is within it." : "Enter a target CAC to see this."
                            }
                        ]}
                    >
                        {/* Benchmark Inner Card */}
                        <div className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300 overflow-hidden dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700">
                            <div className="flex items-center gap-2 p-4">
                                <Target className="w-4 h-4 text-blue-500 flex-shrink-0 dark:text-blue-400" />
                                <span className="text-xs sm:text-[14px] font-bold text-slate-500 tracking-tight dark:text-slate-400">
                                    Benchmark
                                </span>
                            </div>
                            <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs text-slate-500 leading-relaxed pt-3 pl-[24px] dark:text-slate-400">
                                    A good CAC depends on what a customer is worth. A common rule of thumb is an <strong className="text-slate-700 font-semibold dark:text-slate-200">LTV:CAC ratio of 3:1</strong> or higher.
                                </p>
                            </div>
                        </div>
                    </ResultSummaryCard>
                </div>
            </div>
        </FadeIn>
    )
}

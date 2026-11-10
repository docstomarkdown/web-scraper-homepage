"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Tag, Building2, TrendingUp } from "lucide-react"
import { FadeIn, CalculatorInput, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard"
import { BreakEvenBreakdown } from "./BreakEvenBreakdown"
import { breakEven } from "./calc"

export function BreakEvenCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [fixedCosts, setFixedCosts] = useState<number | "">("")
    const [pricePerUnit, setPricePerUnit] = useState<number | "">("")
    const [variableCostPerUnit, setVariableCostPerUnit] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setFixedCosts("")
        setPricePerUnit("")
        setVariableCostPerUnit("")
    }

    // Calculations (see calc.ts)
    const fixed = val(fixedCosts)
    const price = val(pricePerUnit)
    const variable = val(variableCostPerUnit)
    const n = (v: number | "") => (v === "" ? null : v)
    const result = breakEven({ fixedCosts: n(fixedCosts), pricePerUnit: n(pricePerUnit), variableCostPerUnit: n(variableCostPerUnit) })
    const isCalculated = result.ok
    const contributionMargin = price - variable
    const breakEvenUnits = result.ok ? result.breakEvenUnits : 0
    const breakEvenRevenue = result.ok ? result.breakEvenRevenue : 0

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            title="Cost & Pricing Details"
                            description="Enter your costs and pricing details."
                            onReset={handleReset}
                            guideId="break-even-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Fixed Costs */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Business Overheads"
                                    groupingIcon={Building2}
                                    label="Total Fixed Costs"
                                    isCurrency
                                    currency={currency}
                                    value={fixedCosts}
                                    onChange={setFixedCosts}
                                    placeholder="1000.00"
                                    max={10000000}
                                    tooltip="Costs that remain constant regardless of sales volume (e.g., rent, business software, salaries)."
                                />
                            </div>
                            
                            {/* Group 2: Unit Economics */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Unit Economics"
                                    groupingIcon={Tag}
                                    label="Sales Price Per Unit"
                                    isCurrency
                                    currency={currency}
                                    value={pricePerUnit}
                                    onChange={setPricePerUnit}
                                    placeholder="50.00"
                                    max={1000000}
                                    tooltip="The final selling price for a single unit of your product."
                                />
                                <CalculatorInput
                                    label="Variable Cost Per Unit"
                                    isCurrency
                                    currency={currency}
                                    value={variableCostPerUnit}
                                    onChange={setVariableCostPerUnit}
                                    placeholder="30.00"
                                    max={1000000}
                                    isOptional
                                    hint={!result.ok && result.reason === "no-margin" ? "The price must be above the variable cost, or each sale loses money and there is no break-even point." : undefined}
                                    tooltip="Total direct costs to produce or acquire one unit (e.g., manufacturing, packaging, shipping). Leave it blank or 0 for a digital product."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    {/* Main Result Card */}
                    <ResultSummaryCard
                        primaryResult={{
                            value: breakEvenUnits.toLocaleString(),
                            unit: "units",
                            label: "Break-even Units",
                            key: "breakEvenUnits",
                        }}
                        secondaryResults={[
                            {
                                key: "breakEvenRevenue",
                                label: "Break-Even Revenue",
                                value: breakEvenRevenue,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "Total revenue needed to exactly cover both fixed and variable costs."
                            },
                            {
                                key: "contributionMargin",
                                label: "Contribution Margin per Unit",
                                value: contributionMargin,
                                isCurrency: true,
                                icon: TrendingUp,
                                tooltip: "Price minus variable cost per unit: what each sale adds toward fixed costs, then profit."
                            }
                        ]}
                        currency={currency}
                        isCalculated={isCalculated}
                        emptyMessage="Break-even Units"
                        showLiveBadge={false}
                    />

                    {/* Breakdown Card */}
                    <FadeIn delay={0.1}>
                        <BreakEvenBreakdown
                            pricePerUnit={price}
                            variableCostPerUnit={variable}
                            contributionMargin={contributionMargin}
                            fixedCosts={fixed}
                            currency={currency}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}
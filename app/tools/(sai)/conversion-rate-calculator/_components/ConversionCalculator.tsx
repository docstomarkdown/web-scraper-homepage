"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, ShoppingBag, DollarSign } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
import { calculateConversion, conversionError, LIFT_POINTS } from "./calc"

export function ConversionCalculator() {
    const [visitors, setVisitors] = useState<number | "">("")
    const [conversions, setConversions] = useState<number | "">("")
    const [aov, setAov] = useState<number | "">("")
    const [currency, setCurrency] = useState("USD")

    const handleReset = () => {
        setVisitors("")
        setConversions("")
        setAov("")
    }

    const result = calculateConversion(visitors, conversions, aov)
    const error = conversionError(visitors, conversions)
    const rate = result?.rate ?? 0
    const isValid = result !== null

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-3xl dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter traffic and conversion data. Add an order value to see what a lift is worth."
                            onReset={handleReset}
                            guideId="conversion-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Total Visitors (Sessions)"
                                        value={visitors}
                                        onChange={setVisitors}
                                        placeholder="1000"
                                        max={10000000}
                                        tooltip="The total number of unique visitors or sessions."
                                        groupingTitle="Performance Metrics"
                                        groupingIcon={TrendingUp}
                                    />
                                    <CalculatorInput
                                        label="Total Conversions"
                                        value={conversions}
                                        onChange={setConversions}
                                        placeholder="50"
                                        max={1000000}
                                        tooltip="The number of visitors who completed the action you count, such as a purchase or sign-up."
                                        hint={error ? "Conversions can't be more than visitors. Check both are for the same period." : undefined}
                                    />
                                    <CalculatorInput
                                        label="Average Order Value"
                                        value={aov}
                                        onChange={setAov}
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                        placeholder="40.00"
                                        tooltip="What a conversion is worth on average. Used to value a half-point lift."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        title="Conversion Rate"
                        isCalculated={isValid}
                        liveBadgeText={
                            rate >= 3 ? "Excellent" : rate >= 1 ? "Average" : "Low"
                        }
                        liveBadgeColor={
                            rate >= 3 ? "emerald" : rate >= 1 ? "amber" : "rose"
                        }
                        primaryResult={{
                            value: rate.toFixed(2),
                            unit: "%"
                        }}
                        currency={currency}
                        secondaryResults={[
                            {
                                key: "extraOrders",
                                label: `Extra Orders at +${LIFT_POINTS} Points`,
                                value: result ? Math.round(result.extraFromLift * 100) / 100 : 0,
                                icon: ShoppingBag,
                                tooltip: `Conversions you'd gain at the same traffic if the rate rose by ${LIFT_POINTS} percentage points.`
                            },
                            {
                                key: "extraRevenue",
                                label: `Revenue at +${LIFT_POINTS} Points`,
                                value: result?.extraRevenueFromLift != null ? result.extraRevenueFromLift : "—",
                                isCurrency: result?.extraRevenueFromLift != null,
                                icon: DollarSign,
                                tooltip: result?.extraRevenueFromLift != null ? "Extra orders times your average order value." : "Enter an average order value to see this."
                            }
                        ]}
                        emptyMessage="Conversion rate"
                        description={
                            rate >= 3
                                ? "Excellent → Above average conversion" 
                                : rate >= 1 
                                    ? "Average → Room for optimization" 
                                    : "Low → Needs improvement in offer or traffic"
                        }
                    >
                        {/* Benchmark Inner Card */}
                        <div className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300 overflow-hidden dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700">
                            <div className="flex items-center gap-2 p-4">
                                <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0 dark:text-blue-400" />
                                <span className="text-xs sm:text-[14px] font-bold text-slate-500 tracking-tight dark:text-slate-400">
                                    Industry Benchmark
                                </span>
                            </div>
                            <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs text-slate-500 leading-relaxed pt-3 pl-[24px] dark:text-slate-400">
                                    E-commerce conversion rates typically range from <strong className="text-slate-700 font-semibold dark:text-slate-200">1% to 3%</strong>. A rate above <strong className="text-slate-700 font-semibold dark:text-slate-200">3%</strong> is generally considered excellent, though this varies by industry and traffic quality.
                                </p>
                            </div>
                        </div>
                    </ResultSummaryCard>
                </div>
            </div>
        </FadeIn>
    )
}
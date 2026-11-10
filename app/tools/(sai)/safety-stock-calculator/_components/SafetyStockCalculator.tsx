"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorInput } from "@/app/tools/_shared/components/CalculatorInput";
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard";
import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { CalculatorCardHeader } from "@/app/tools/_shared/components/CalculatorCardHeader";
import { ShieldCheck, TrendingUp, Clock, Package, BarChart3 } from "lucide-react";
import { Counter } from "@/app/tools/_shared/components/Counter";
import { SafetyStockBreakdown } from "./SafetyStockBreakdown";
import { safetyStock } from "./calc";

export function SafetyStockCalculator() {
    const [maxDailySales, setMaxDailySales] = useState<number | "">("");
    const [maxLeadTime, setMaxLeadTime] = useState<number | "">("");
    const [avgDailySales, setAvgDailySales] = useState<number | "">("");
    const [avgLeadTime, setAvgLeadTime] = useState<number | "">("");

    const handleReset = () => {
        setMaxDailySales("");
        setMaxLeadTime("");
        setAvgDailySales("");
        setAvgLeadTime("");
    };

    const num = (v: number | "") => (v === "" ? null : v);
    const result = safetyStock({
        maxDailySales: num(maxDailySales),
        maxLeadTimeDays: num(maxLeadTime),
        avgDailySales: num(avgDailySales),
        avgLeadTimeDays: num(avgLeadTime),
    });
    const isCalculated = result.ok;
    const maxUsage = result.ok ? result.maxUsage : 0;
    const avgUsage = result.ok ? result.avgUsage : 0;
    const buffer = result.ok ? result.safetyStock : 0;
    const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            title="Stock Variables"
                            description="Enter your worst-case and average sales and lead time data."
                            onReset={handleReset}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Worst-Case Scenario"
                                    groupingIcon={TrendingUp}
                                    label="Max Daily Sales (Units)"
                                    value={maxDailySales}
                                    onChange={setMaxDailySales}
                                    placeholder="20"
                                    tooltip="Your single highest sales day ever — use your peak holiday or promotion figure"
                                />
                                <CalculatorInput
                                    label="Max Lead Time (Days)"
                                    value={maxLeadTime}
                                    onChange={setMaxLeadTime}
                                    placeholder="21"
                                    tooltip="The longest your supplier has ever taken to deliver — your worst-case shipping delay"
                                />
                            </div>
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Normal Operating Baseline"
                                    groupingIcon={BarChart3}
                                    label="Avg. Daily Sales (Units)"
                                    value={avgDailySales}
                                    onChange={setAvgDailySales}
                                    placeholder="10"
                                    tooltip="Your typical daily units sold — a 30 or 60-day average works well here"
                                />
                                <CalculatorInput
                                    label="Avg. Lead Time (Days)"
                                    value={avgLeadTime}
                                    onChange={setAvgLeadTime}
                                    placeholder="14"
                                    tooltip="How many days it normally takes for stock to arrive from your supplier"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        primaryResult={{
                            value: fmt(buffer),
                            unit: "Units",
                            label: "Safety Stock Buffer",
                            key: "safetyStock",
                        }}
                        secondaryResults={[
                            {
                                key: "maxDemand",
                                label: "Max Lead Time Demand",
                                value: `${fmt(maxUsage)} Units`,
                                icon: TrendingUp,
                                tooltip: "Total units you'd sell in the worst-case: Max Daily Sales × Max Lead Time"
                            },
                            {
                                key: "avgDemand",
                                label: "Avg. Lead Time Demand",
                                value: `${fmt(avgUsage)} Units`,
                                icon: BarChart3,
                                tooltip: "Units sold during a normal restock cycle: Avg Daily Sales × Avg Lead Time"
                            },
                            {
                                key: "bufferDays",
                                label: "Buffer in Days of Average Sales",
                                value: `${result.ok ? fmt(result.bufferDays) : 0} Days`,
                                icon: Clock,
                                tooltip: "Safety stock ÷ average daily sales."
                            },
                            {
                                key: "rop",
                                label: "Reorder Point",
                                value: `${result.ok ? fmt(result.reorderPoint) : 0} Units`,
                                icon: Package,
                                tooltip: "Average lead-time demand (rounded up) + safety stock. Order when stock falls to this level."
                            }
                        ]}
                        isCalculated={isCalculated}
                        emptyMessage="Safety Stock Buffer"
                        showLiveBadge={false}
                    >
                        <FadeIn delay={0.1}>
                            {/* Inventory Protection — stays inside the result card */}
                            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] space-y-3 mt-4 dark:bg-slate-900 dark:border-slate-800">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-blue-500 mt-0.5 dark:text-blue-400" />
                                    <div>
                                        <h2 className="font-semibold text-slate-800 mb-1 dark:text-slate-100">
                                            Inventory Protection
                                        </h2>
                                        <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-300">
                                            {isCalculated ? (
                                                <>
                                                    To cover demand variability and supplier delays, hold <strong>{fmt(buffer)} units</strong> as a permanent buffer. It covers the worst case you entered: peak sales during your longest delivery.
                                                </>
                                            ) : !result.ok && result.reason === "max-below-average" ? (
                                                <>The worst-case figures must be at least the averages. Check max daily sales and max lead time.</>
                                            ) : (
                                                <>Enter your sales and lead time figures to see your recommended buffer quantity.</>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </ResultSummaryCard>

                    {/* Stock Calculation Breakdown — outside main result card */}
                    <FadeIn delay={0.2}>
                        <SafetyStockBreakdown
                            avgUsage={avgUsage}
                            safetyStock={buffer}
                            maxUsage={maxUsage}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}
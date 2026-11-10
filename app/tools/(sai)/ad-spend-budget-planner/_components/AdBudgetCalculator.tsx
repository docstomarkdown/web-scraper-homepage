"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, MousePointer2, Calendar, MousePointerClick, ShoppingBag, Receipt } from "lucide-react";
import { FadeIn, CalculatorInput, CalculatorCardHeader, ResultSummaryCard } from "@/app/tools/_shared/components";
import { planBudget } from "./calc";

export function AdBudgetCalculator() {
    const [currency, setCurrency] = useState("USD");

    const [revenueGoal, setRevenueGoal] = useState<number | "">("")
    const [targetROAS, setTargetROAS] = useState<number | "">("")

    // New Traffic Inputs
    const [avgCPC, setAvgCPC] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")

    const result = planBudget(revenueGoal, targetROAS, avgCPC, conversionRate);
    const requiredAdSpend = result?.monthlySpend ?? 0;

    const handleReset = () => {
        setRevenueGoal("");
        setTargetROAS("");
        setAvgCPC("");
        setConversionRate("");
    };

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden pb-4 dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your monthly revenue goal and target ROAS."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                            {/* Group 1: Goals */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    label="Monthly Revenue Goal"
                                    isCurrency
                                    currency={currency}
                                    value={revenueGoal}
                                    onChange={setRevenueGoal}
                                    placeholder="100,000"
                                    tooltip="Total target revenue to be generated from advertising campaigns during a single month."
                                    groupingTitle="Growth Goals"
                                    groupingIcon={Target}
                                    hideSeparator={true}
                                />
                                <CalculatorInput
                                    label="Target ROAS"
                                    value={targetROAS}
                                    onChange={setTargetROAS}
                                    placeholder="4.0"
                                    tooltip="Desired ratio of revenue generated to ad spend (for example, ROAS 4.0 means 4 of revenue for every 1 spent)."
                                />
                            </div>

                            {/* Group 2: Traffic Assumptions */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    label="Avg. Cost Per Click"
                                    isCurrency
                                    currency={currency}
                                    value={avgCPC}
                                    onChange={setAvgCPC}
                                    placeholder="1.50"
                                    data-ignore-check="true"
                                    tooltip="Estimated amount paid for each individual click on an advertisement."
                                    groupingTitle="Traffic Assumptions"
                                    groupingIcon={MousePointer2}
                                    isOptional
                                    ignoreChecklist={true}
                                />
                                <CalculatorInput
                                    label="Conversion Rate"
                                    value={conversionRate}
                                    onChange={setConversionRate}
                                    placeholder="3.5"
                                    max={100}
                                    suffix="%"
                                    data-ignore-check="true"
                                    isOptional
                                    ignoreChecklist={true}
                                    tooltip="Percentage of ad-directed visitors who complete a purchase."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        title="Monthly Ad Budget"
                        panelTitle="Result Panel"
                        showLiveBadge={true}
                        liveBadgeText="Budget set"
                        liveBadgeColor="blue"
                        primaryResult={{
                            value: requiredAdSpend,
                            label: "Required Ad Spend",
                            isCurrency: true,
                            key: "monthly_spend"
                        }}
                        description={requiredAdSpend > 0 ? "Ad spend required to hit your monthly revenue target at your set ROAS." : undefined}
                        secondaryResults={[
                            {
                                key: "daily_spend",
                                label: "Daily Ad Spend Required",
                                value: result?.dailySpend ?? 0,
                                isCurrency: true,
                                icon: Calendar,
                                tooltip: "The distributed daily budget necessary to meet the total monthly advertising objective."
                            },
                            {
                                key: "est_clicks",
                                label: "Estimated Clicks",
                                value: result?.clicks != null ? Math.round(result.clicks) : "—",
                                icon: MousePointerClick,
                                tooltip: result?.clicks != null ? "Monthly budget divided by your average cost per click." : "Enter your average cost per click to see this."
                            },
                            {
                                key: "est_orders",
                                label: "Estimated Orders",
                                value: result?.orders != null ? Math.round(result.orders) : "—",
                                icon: ShoppingBag,
                                tooltip: result?.orders != null ? "Estimated clicks times your conversion rate." : "Enter your cost per click and conversion rate to see this."
                            },
                            {
                                key: "revenue_per_order",
                                label: "Revenue Needed per Order",
                                value: result?.revenuePerOrder != null ? result.revenuePerOrder : "—",
                                isCurrency: result?.revenuePerOrder != null,
                                icon: Receipt,
                                tooltip: result?.revenuePerOrder != null ? "Revenue goal divided by estimated orders. Compare it with your average order value today." : "Enter your cost per click and conversion rate to see this."
                            },
                        ]}
                        currency={currency}
                        isCalculated={requiredAdSpend > 0}
                        emptyMessage="Required Ad Spend"
                        dynamicMessages={{
                            neutral: "The ad spend needed to reach your monthly revenue goal at your target ROAS.",
                            positive: "The ad spend needed to reach your monthly revenue goal at your target ROAS.",
                            negative: "The ad spend needed to reach your monthly revenue goal at your target ROAS."
                        }}
                    />
                </div>
            </div>
        </FadeIn>
    );
}


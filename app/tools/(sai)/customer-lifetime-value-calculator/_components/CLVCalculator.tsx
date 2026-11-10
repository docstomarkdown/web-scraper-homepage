"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { User, TrendingUp, DollarSign, Scale, Wallet } from "lucide-react"
import { FadeIn, CalculatorInput, CalculatorCardHeader, ResultSummaryCard, formatCurrencyValue } from "@/app/tools/_shared/components"
import { CLVBreakdown } from "./CLVBreakdown";
import { calculateClv } from "./calc";

export function CLVCalculator() {
    const [currency, setCurrency] = useState("USD");

    // Core Value Drivers
    const [aov, setAov] = useState<number | "">("")
    const [frequency, setFrequency] = useState<number | "">("")
    const [lifespan, setLifespan] = useState<number | "">("")

    // Profit & Acquisition
    const [grossMargin, setGrossMargin] = useState<number | "">("")
    const [cac, setCac] = useState<number | "">("")

    const handleReset = () => {
        setAov("");
        setFrequency("");
        setLifespan("");
        setGrossMargin("");
        setCac("");
    };

    const result = calculateClv(aov, frequency, lifespan, grossMargin, cac);
    const clv = result?.lifetimeRevenue ?? 0;
    const grossProfit = result?.lifetimeProfit ?? 0;
    const cacVal = result?.profitAfterCac != null ? Number(cac) : 0;
    const hasMargin = result?.lifetimeProfit != null;
    const ratio = result?.ltvToCac ?? null;
    const isCalculated = result !== null;

    // A verdict only when the ratio can be worked out.
    let badgeText = "";
    let badgeColor: "emerald" | "amber" | "rose" = "emerald";
    if (ratio !== null) {
        if (ratio >= 3) { badgeText = "3:1 or better"; badgeColor = "emerald"; }
        else if (ratio >= 1) { badgeText = "Below 3:1"; badgeColor = "amber"; }
        else { badgeText = "Costs more than it earns"; badgeColor = "rose"; }
    }

    const formatCurrency = (v: number) => formatCurrencyValue(v, currency, 2);

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs - Sticky */}
                <div className="lg:col-span-7 lg:sticky lg:top-8">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                            <CalculatorCardHeader
                                description="Define your customer's behavior and unit economics."
                                onReset={handleReset}
                                currency={currency}
                                onCurrencyChange={setCurrency}
                            />
                            <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                                <div className="space-y-6 max-w-[520px] mx-auto w-full">

                                    {/* Group 1: Customer Behavior */}
                                    <div className="space-y-4">
                                        <CalculatorInput
                                            label="Avg. Order Value"
                                            value={aov}
                                            onChange={setAov}
                                            placeholder="50"
                                            isCurrency
                                            currency={currency}
                                            tooltip="The average amount a customer spends each time they buy. Use your store's average if you're unsure."
                                            groupingTitle="Customer Behavior"
                                            groupingIcon={User}
                                            hideSeparator={true}
                                        />
                                        <CalculatorInput
                                            label="Annual Purchase Frequency"
                                            value={frequency}
                                            onChange={setFrequency}
                                            placeholder="4"
                                            min={1}
                                            tooltip="How many times, on average, a customer buys from you per year. For example, 4 = once per quarter."
                                        />
                                        <CalculatorInput
                                            label="Customer Lifespan"
                                            suffix="yrs"
                                            value={lifespan}
                                            onChange={setLifespan}
                                            placeholder="3"
                                            min={1}
                                            tooltip="How many years a typical customer stays active before they stop buying."
                                        />
                                    </div>

                                    {/* Group 2: Unit Economics */}
                                    <div className="space-y-4">
                                        <CalculatorInput
                                            label="Gross Margin"
                                            suffix="%"
                                            value={grossMargin}
                                            onChange={setGrossMargin}
                                            placeholder="40"
                                            min={0}
                                            max={100}
                                            tooltip="The percentage of revenue left after subtracting product and shipping costs. Example: 40% means you keep $40 from a $100 sale."
                                            groupingTitle="Unit Economics"
                                            groupingIcon={TrendingUp}
                                        />
                                        <CalculatorInput
                                            label="Acquisition Cost (CAC)"
                                            value={cac}
                                            onChange={setCac}
                                            placeholder="30"
                                            isCurrency
                                            currency={currency}
                                            tooltip="What you spend on ads and marketing to acquire one new customer. Leave blank if you're not tracking this yet."
                                            isOptional
                                            ignoreChecklist={true}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results - Scrollable */}
                <div className="lg:col-span-5 space-y-4">
                    <FadeIn delay={0.4} direction="left" className="space-y-4">
                        <ResultSummaryCard
                            panelTitle="CLV Calculator"
                            isCalculated={isCalculated}
                            currency={currency}
                            emptyMessage="Customer Lifetime Value"
                            showLiveBadge={badgeText !== ""}
                            liveBadgeText={badgeText}
                            liveBadgeColor={badgeColor}
                            description={
                                isCalculated
                                    ? hasMargin
                                        ? "Total expected revenue generated by a single customer."
                                        : "Add Gross Margin to see lifetime profit."
                                    : undefined
                            }
                            primaryResult={{
                                value: clv,
                                label: "Customer Lifetime Value (CLV)",
                                isCurrency: true,
                                key: "clv"
                            }}
                            secondaryResults={[
                                {
                                    key: "totalRevenue",
                                    label: "Total Lifetime Revenue",
                                    value: clv,
                                    isCurrency: true,
                                    icon: DollarSign,
                                    tooltip: "Avg. order value × purchases a year × lifespan in years."
                                },
                                {
                                    key: "lifetimeProfit",
                                    label: "Lifetime Profit",
                                    value: hasMargin ? grossProfit : "—",
                                    isCurrency: hasMargin,
                                    icon: TrendingUp,
                                    tooltip: hasMargin ? "Lifetime revenue × gross margin, before acquisition cost." : "Enter your gross margin to see this."
                                },
                                {
                                    key: "profitAfterCac",
                                    label: "Profit After Acquisition Cost",
                                    value: result?.profitAfterCac != null ? result.profitAfterCac : "—",
                                    isCurrency: result?.profitAfterCac != null,
                                    icon: Wallet,
                                    tooltip: result?.profitAfterCac != null ? `Lifetime profit (${formatCurrency(grossProfit)}) − CAC (${formatCurrency(cacVal)}).` : "Enter your gross margin and acquisition cost to see this."
                                },
                                {
                                    key: "ltvCac",
                                    label: "LTV:CAC Ratio",
                                    value: ratio !== null ? `${ratio.toFixed(2)} : 1` : "—",
                                    icon: Scale,
                                    tooltip: ratio !== null ? "Lifetime profit divided by acquisition cost." : "Enter your gross margin and acquisition cost to see this."
                                }
                            ]}
                            checklistItems={[
                                { key: "aov", label: "Avg. Order Value", isComplete: aov !== "" },
                                { key: "frequency", label: "Purchase Frequency", isComplete: frequency !== "" },
                                { key: "lifespan", label: "Customer Lifespan", isComplete: lifespan !== "" },
                            ]}
                        />

                        <CLVBreakdown
                            clvRevenue={hasMargin ? clv : 0}
                            grossProfit={grossProfit}
                            cacVal={cacVal}
                            netProfit={grossProfit - cacVal}
                            marginVal={hasMargin ? Number(grossMargin) : 0}
                            currency={currency}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}
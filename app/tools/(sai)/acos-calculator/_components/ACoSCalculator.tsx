"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Percent, BarChart3, Scale, PieChart } from "lucide-react"
import { FadeIn, CalculatorInput, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard"
import { ACoSBreakdown } from "./ACoSBreakdown"
import { calculateAcos } from "./calc"

export function ACoSCalculator() {
    const [currency, setCurrency] = useState<string>("USD")
    const [adSpend, setAdSpend] = useState<number | "">("")
    const [adRevenue, setAdRevenue] = useState<number | "">("")
    const [profitMargin, setProfitMargin] = useState<number | "">("")
    const [totalRevenue, setTotalRevenue] = useState<number | "">("")

    const result = calculateAcos({ adSpend, adRevenue, marginPct: profitMargin, totalRevenue })
    const hasMargin = result?.netProfit != null

    const handleReset = () => {
        setAdSpend("")
        setAdRevenue("")
        setProfitMargin("")
        setTotalRevenue("")
    }

    // A verdict only when the margin is known: ACoS below the margin makes money.
    let status = ""
    let badgeColor: "emerald" | "amber" | "rose" | "slate" = "slate"
    if (result && result.breakEvenAcos !== null) {
        if (Math.abs(result.acos - result.breakEvenAcos) < 0.1) {
            status = "Break-even"
            badgeColor = "amber"
        } else if (result.acos < result.breakEvenAcos) {
            status = "Profitable"
            badgeColor = "emerald"
        } else {
            status = "Unprofitable"
            badgeColor = "rose"
        }
    }

    const revenueValue = Number(adRevenue) || 0
    const cogs = hasMargin ? revenueValue * (1 - (Number(profitMargin) || 0) / 100) : 0
    const needMargin = "Enter your profit margin to see this."

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your ad spend and ad revenue. Add your margin for profit, and your total sales for TACoS."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Campaign Data */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Campaign Data"
                                    groupingIcon={TrendingUp}
                                    label="Ad Spend"
                                    isCurrency
                                    currency={currency}
                                    value={adSpend}
                                    onChange={setAdSpend}
                                    placeholder="500.00"
                                    min={0}
                                    tooltip="Total amount spent on advertising."
                                />
                                <CalculatorInput
                                    label="Ad Revenue"
                                    isCurrency
                                    currency={currency}
                                    value={adRevenue}
                                    onChange={setAdRevenue}
                                    placeholder="2000.00"
                                    min={0}
                                    tooltip="Sales your ad console credits to the ads."
                                />
                            </div>
                            {/* Group 2: Product Metrics */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Product Metrics"
                                    groupingIcon={Percent}
                                    label="Profit Margin"
                                    suffix="%"
                                    isOptional
                                    value={profitMargin}
                                    onChange={setProfitMargin}
                                    placeholder="30.0"
                                    min={0}
                                    max={100}
                                    tooltip="Your profit margin before ads, as a percentage of the sale price. This is your break-even ACoS."
                                />
                                <CalculatorInput
                                    label="Total Revenue"
                                    isCurrency
                                    currency={currency}
                                    isOptional
                                    value={totalRevenue}
                                    onChange={setTotalRevenue}
                                    placeholder="10000.00"
                                    min={0}
                                    tooltip="All your sales for the same period, from ads and organic. Used for TACoS."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        primaryResult={{
                            value: result ? result.acos.toFixed(2) : "0",
                            unit: "%",
                            label: "ACoS",
                            key: "acos"
                        }}
                        secondaryResults={[
                            {
                                key: "roas",
                                label: "ROAS",
                                value: result ? `${result.roas.toFixed(2)}×` : "—",
                                icon: BarChart3,
                                tooltip: "Ad revenue divided by ad spend."
                            },
                            {
                                key: "breakEvenAcos",
                                label: "Break-even ACoS",
                                value: result?.breakEvenAcos != null ? `${result.breakEvenAcos.toFixed(2)}%` : "—",
                                icon: Scale,
                                tooltip: hasMargin ? "Your margin before ads. Keep ACoS below this to make money on ad sales." : needMargin
                            },
                            {
                                key: "netProfit",
                                label: "Net Profit After Ads",
                                value: result?.netProfit != null ? result.netProfit : "—",
                                isCurrency: hasMargin,
                                icon: DollarSign,
                                tooltip: hasMargin ? "Ad revenue × margin − ad spend." : needMargin
                            },
                            {
                                key: "tacos",
                                label: "TACoS",
                                value: result?.tacos != null ? `${result.tacos.toFixed(2)}%` : "—",
                                icon: PieChart,
                                tooltip: result?.tacos != null ? "Ad spend divided by total revenue." : "Enter your total revenue to see TACoS."
                            },
                            {
                                key: "marginAfterAds",
                                label: "Margin After Ads (All Sales)",
                                value: result?.marginAfterAds != null ? `${result.marginAfterAds.toFixed(2)}%` : "—",
                                icon: Percent,
                                tooltip: result?.marginAfterAds != null ? "Profit margin minus TACoS, in percentage points." : "Enter your profit margin and total revenue to see this."
                            }
                        ]}
                        profitLossKey={hasMargin ? "netProfit" : undefined}
                        currency={currency}
                        isCalculated={result !== null}
                        emptyMessage="ACoS"
                        emptyResultLabel="ACoS %"
                        showLiveBadge={status !== ""}
                        liveBadgeText={status}
                        liveBadgeColor={badgeColor}
                        validationBadgeText={{ valid: "Profitable", invalid: "Unprofitable" }}
                        description={hasMargin ? undefined : "Add your profit margin to see whether the ads make money."}
                        dynamicMessages={{
                            positive: "ACoS is below your margin, so the ads add profit.",
                            negative: "ACoS is above your margin, so each ad sale loses money.",
                            neutral: "ACoS equals your margin, so the ads break even."
                        }}
                    />

                    {/* Breakdown Card */}
                    <FadeIn delay={0.1}>
                        <ACoSBreakdown
                            revenue={hasMargin ? revenueValue : 0}
                            spend={Number(adSpend) || 0}
                            cogs={cogs}
                            netProfit={result?.netProfit ?? 0}
                            currency={currency}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}

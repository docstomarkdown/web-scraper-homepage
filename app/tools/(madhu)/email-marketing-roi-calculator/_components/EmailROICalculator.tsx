"use client"
import React, { useState } from "react"

import {
    FadeIn,
    CalculatorInput,
    ResultSummaryCard,
    CalculatorCardHeader,
} from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MousePointerClick, TrendingUp, CircleDollarSign, Scale } from "lucide-react"
import { CampaignResults } from "./CampaignResults"
import { calculateEmailRoi, emailFunnel } from "./calc"

export function EmailROICalculator() {
    const [currency, setCurrency] = useState("USD")
    const [listSize, setListSize] = useState<number | "">("")
    const [campaignCost, setCampaignCost] = useState<number | "">("")
    const [openRate, setOpenRate] = useState<number | "">(20)
    const [clickThroughRate, setClickThroughRate] = useState<number | "">(2.5)
    const [conversionRate, setConversionRate] = useState<number | "">(3)
    const [averageOrderValue, setAverageOrderValue] = useState<number | "">(50)

    const handleReset = () => {
        setListSize("")
        setCampaignCost("")
        setOpenRate(20)
        setClickThroughRate(2.5)
        setConversionRate(3)
        setAverageOrderValue(50)
    }

    const inputs = { listSize, cost: campaignCost, openPct: openRate, clickPct: clickThroughRate, conversionPct: conversionRate, aov: averageOrderValue }
    const result = calculateEmailRoi(inputs)
    const funnel = emailFunnel(inputs)
    const roi = result?.roi ?? 0
    const netProfit = result?.profit ?? 0
    const revenue = funnel.revenue

    const isCalculated = result !== null
    const formatCurrency = (v: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 2,
        }).format(v)
    const formatNumber = (v: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(v)

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-2 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 flex flex-col h-full space-y-3">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden h-full flex flex-col dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Essential metrics for quick ROI calculation."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            onReset={handleReset}
                        />
                        <CardContent className="p-4 md:p-6 pb-12 md:pb-16 flex-1 flex flex-col">
                            {/* Campaign Setup */}
                            <CalculatorInput
                                hideSeparator={true}
                                label="Number of Email Subscribers"
                                value={listSize}
                                onChange={setListSize}
                                placeholder="10000"
                                tooltip="Total number of subscribers who will receive your email campaign."
                                groupingTitle="Campaign setup"
                                groupingIcon={Users}
                            />
                            <CalculatorInput
                                label="Total Campaign Cost"
                                value={campaignCost}
                                onChange={setCampaignCost}
                                placeholder="500.00"
                                tooltip="Total cost including email software, design, copywriting, and marketing expenses."
                                currency={currency}
                            />
                            {/* Performance Metrics */}
                            <CalculatorInput
                                label="Open Rate"
                                value={openRate}
                                onChange={setOpenRate}
                                placeholder="20"
                                tooltip="Percentage of subscribers who open your email. Use the rate from your recent campaigns."
                                suffix="%"
                                groupingTitle="Email Performance"
                                groupingIcon={MousePointerClick}
                            />
                            <CalculatorInput
                                label="Click Rate"
                                value={clickThroughRate}
                                onChange={setClickThroughRate}
                                placeholder="2.5"
                                tooltip="Percentage of email openers who clicked a link."
                                suffix="%"
                            />
                            <CalculatorInput
                                label="Sales Conversion Rate"
                                value={conversionRate}
                                onChange={setConversionRate}
                                placeholder="3"
                                tooltip="Percentage of link clickers who completed a purchase."
                                suffix="%"
                            />
                            <CalculatorInput
                                label="Average Order Value"
                                value={averageOrderValue}
                                onChange={setAverageOrderValue}
                                placeholder="50"
                                tooltip="Average revenue from each purchase."
                                currency={currency}
                            />

                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-32">
                    <ResultSummaryCard
                        title="ROI (Return on Investment)"
                        currency={currency}
                        primaryResult={{
                            value: roi.toFixed(2),
                            unit: "%",
                            label: "Return on Investment",
                        }}
                        secondaryResults={[
                            {
                                key: "revenue",
                                label: "Total Revenue",
                                value: revenue.toFixed(2),
                                isCurrency: true,
                                tooltip: "Total revenue generated from the campaign.",
                                icon: CircleDollarSign,
                            },
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: netProfit.toFixed(2),
                                isCurrency: true,
                                tooltip: "Total revenue generated minus the campaign cost.",
                                icon: TrendingUp,
                            },
                            {
                                key: "breakEven",
                                label: "Break-even List Size",
                                value: result?.breakEvenListSize != null ? `${result.breakEvenListSize.toLocaleString("en-US")} subscribers` : "—",
                                tooltip: result?.breakEvenListSize != null ? "The list size at which revenue equals the campaign cost, at these rates." : "Enter rates and an order value above 0 to see this.",
                                icon: Scale,
                            },
                        ]}
                        showLiveBadge={true}
                        isCalculated={isCalculated}
                        profitLossKey="netProfit"
                        emptyResultLabel="Return on Investment"
                        checklistItems={[
                            { key: 'size', label: 'Email List Size', isComplete: listSize !== "" },
                            { key: 'cost', label: 'Campaign Cost', isComplete: Number(campaignCost) > 0 }
                        ]}
                        dynamicMessages={{
                            positive: "The campaign brings in more than it costs.",
                            negative: "The campaign costs more than it brings in. Compare the list size with the break-even list size.",
                            neutral: "The campaign breaks even."
                        }}
                    />
                    <CampaignResults
                        opens={funnel.opens}
                        clicks={funnel.clicks}
                        conversions={funnel.orders}
                        revenue={revenue}
                        openPct={Number(openRate) || 0}
                        ctrPct={Number(clickThroughRate) || 0}
                        convPct={Number(conversionRate) || 0}
                        formatNumber={formatNumber}
                        formatCurrency={formatCurrency}
                    />
                </div>
            </div>
        </FadeIn>
    )
}

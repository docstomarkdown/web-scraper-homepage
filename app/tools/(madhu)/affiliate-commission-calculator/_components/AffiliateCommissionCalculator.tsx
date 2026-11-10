"use client"
import React, { useState, useMemo } from "react"
import {
    MousePointerClick,
    Percent,
    ShoppingCart,
    Handshake,
    PackageOpen,
    DollarSign,
    TrendingUp
} from "lucide-react"

import {
    Counter,
    CalculatorInput,
    CalculatorCardHeader,
    ResultSummaryCard,
    currencies
} from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { calculateAffiliate } from "./calc"

interface AffiliateState {
    affiliateTraffic: number | ""
    conversionRate: number | ""
    averageOrderValue: number | ""
    affiliateCommission: number | ""
    productCost: number | ""
}

const DEFAULT_STATE: AffiliateState = {
    affiliateTraffic: "",
    conversionRate: 2.5,
    averageOrderValue: "",
    affiliateCommission: "",
    productCost: ""
}

export function AffiliateCommissionCalculator() {
    const [values, setValues] = useState<AffiliateState>(DEFAULT_STATE)
    const [currencyCode, setCurrencyCode] = useState("USD")

    // Get current currency symbol
    const currencySymbol = useMemo(() => {
        return currencies.find(c => c.code === currencyCode)?.symbol || "$"
    }, [currencyCode])

    const handleInputChange = (field: keyof AffiliateState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    }

    // Results calculate only when the required fields are filled with valid values
    const calc = calculateAffiliate({
        clicks: values.affiliateTraffic,
        conversionPct: values.conversionRate,
        aov: values.averageOrderValue,
        commissionPct: values.affiliateCommission,
        productCostPct: values.productCost,
    })
    const hasInputs = calc !== null
    const results = calc ?? { sales: 0, revenue: 0, payout: 0, productCost: 0, netProfit: 0 }

    const handleReset = () => {
        setValues(DEFAULT_STATE)
        setCurrencyCode("USD")
    }

    return (
        <div className="max-w-6xl mx-auto py-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 flex flex-col h-full">
                    <Card className="border border-slate-200/80 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter traffic, pricing, and commission details to estimate affiliate payouts and profitability."
                            currency={currencyCode}
                            onCurrencyChange={setCurrencyCode}
                            onReset={handleReset}
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex-1 flex flex-col">
                            {/* All Inputs in Groups */}
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* 1. Campaign Traffic */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Affiliate Clicks"
                                        value={values.affiliateTraffic}
                                        onChange={(v) => handleInputChange('affiliateTraffic', v)}
                                        placeholder="10,000"
                                        tooltip="Total number of visitors (clicks) sent by your affiliates to your store or landing page."
                                        groupingTitle="Campaign Traffic"
                                        groupingIcon={MousePointerClick}
                                    />
                                    <CalculatorInput
                                        label="Conversion Rate"
                                        value={values.conversionRate}
                                        onChange={(v) => handleInputChange('conversionRate', v)}
                                        placeholder="2.5"
                                        tooltip="Percentage of affiliate clicks that turn into actual purchases. Pre-filled with the industry average."
                                        suffix="%"
                                        hint="Industry average: 1% – 3%"
                                        benchmarkBadge={true}
                                        isOptional={true}
                                        step={0.01}
                                        max={100}
                                    />
                                </div>

                                {/* 2. Store Details */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Average Order Value"
                                        value={values.averageOrderValue}
                                        onChange={(v) => handleInputChange('averageOrderValue', v)}
                                        placeholder="75.00"
                                        tooltip="The average amount a customer spends per order on your store."
                                        prefix={currencySymbol}
                                        step={0.01}
                                        groupingTitle="Store Details"
                                        groupingIcon={ShoppingCart}
                                    />
                                </div>

                                {/* 3. Payout & Profit */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Commission Rate"
                                        value={values.affiliateCommission}
                                        onChange={(v) => handleInputChange('affiliateCommission', v)}
                                        placeholder="10"
                                        tooltip="The percentage of each sale you pay to an affiliate as their commission."
                                        suffix="%"
                                        hint="Typical range: 5% – 30%"
                                        step={0.01}
                                        max={100}
                                        groupingTitle="Payout & Profit"
                                        groupingIcon={Handshake}
                                    />
                                    <CalculatorInput
                                        label="Product Cost"
                                        value={values.productCost}
                                        onChange={(v) => handleInputChange('productCost', v)}
                                        placeholder="40"
                                        tooltip="Your cost to produce or source the product, as a percentage of revenue. Helps calculate your actual profit after paying affiliates."
                                        suffix="%"
                                        hint="Helps calculate your net profit"
                                        isOptional={true}
                                        step={0.01}
                                        max={100}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 h-full">
                    <ResultSummaryCard
                        title="Total commission paid"
                        primaryResult={{
                            value: results.payout,
                            isCurrency: true,
                            label: "Total Affiliate Payout",
                            key: "affiliatePayout"
                        }}
                        secondaryResults={[
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: results.netProfit,
                                isCurrency: true,
                                tooltip: "Your take-home profit after deducting affiliate commissions and product costs. Calculated as Revenue − Affiliate Payout − Product Cost.",
                                icon: TrendingUp,
                            },
                            {
                                key: "totalRevenue",
                                label: "Total Revenue",
                                value: results.revenue,
                                isCurrency: true,
                                tooltip: "Total revenue generated from estimated sales. Calculated as Estimated Sales × Average Order Value.",
                                icon: DollarSign,
                            },
                            {
                                key: "estimatedSales",
                                label: "Estimated Sales",
                                value: (Math.round(results.sales * 100) / 100).toLocaleString(),
                                unit: " sales",
                                tooltip: "Number of actual purchases expected from the affiliate traffic. Calculated as Clicks × Conversion Rate.",
                                icon: ShoppingCart,
                            }
                        ]}
                        isCalculated={hasInputs}
                        profitLossKey="netProfit"
                        currency={currencyCode}
                        showLiveBadge={hasInputs}
                        validationBadgeText={{ valid: "Profitable", invalid: "Loss" }}
                        checklistItems={[
                            { key: 'traffic', label: 'Affiliate Traffic', isComplete: values.affiliateTraffic !== "" },
                            { key: 'aov', label: 'Average Order Value', isComplete: values.averageOrderValue !== "" },
                            { key: 'commission', label: 'Commission Rate', isComplete: values.affiliateCommission !== "" }
                        ]}
                        dynamicMessages={{
                            positive: "Revenue covers the payouts and product costs at this commission rate.",
                            negative: "Program is operating at a loss. Consider adjusting your commission rate.",
                            neutral: "Program is breaking even. Revenue exactly covers payouts and costs."
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

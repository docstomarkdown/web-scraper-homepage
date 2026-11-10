"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, PieChart, Calculator, Percent, Receipt, CreditCard } from "lucide-react"
import {
    CalculatorCardHeader,
    CalculatorInput,
    CurrencyCombobox,
    ResultSummaryCard,
    FadeIn
} from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { ProfitAllocation } from "./ProfitAllocation"
import { netProfit } from "./calc"
export function NetProfitCalculator() {
    const [currency, setCurrency] = useState("USD")
    // Input States
    const [revenue, setRevenue] = useState<number | "">("")
    const [cogs, setCogs] = useState<number | "">("")
    const [adSpend, setAdSpend] = useState<number | "">("")
    const [overhead, setOverhead] = useState<number | "">("") // Includes software, rent, etc.
    const [taxRate, setTaxRate] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)
    const handleReset = () => {
        setRevenue("")
        setCogs("")
        setAdSpend("")
        setOverhead("")
        setTaxRate("")
    }
    // Calculations (see calc.ts)
    const n = (v: number | "") => (v === "" ? null : v)
    const result = netProfit({ revenue: n(revenue), cogs: n(cogs), adSpend: n(adSpend), overhead: n(overhead), taxRate: n(taxRate) })
    const r = val(revenue)
    const c = val(cogs)
    const ads = val(adSpend)
    const over = val(overhead)
    const taxAmount = result?.tax ?? 0
    const netProfitValue = result?.netProfit ?? 0
    const netMargin = result?.netMargin ?? 0
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }
    const formatCompact = (val: number) => {
        const absVal = Math.abs(val)
        if (absVal < 1000000) return formatCurrency(val)
        // For extremely massive numbers, reduce precision to keep string short
        const digits = absVal > 1000000000000 ? 0 : 1
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: digits
        }).format(val)
    }
    const formatPercent = (val: number) => {
        if (Math.abs(val) < 10000) return `${val.toFixed(2)}%`
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(val) + "%"
    }
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-2 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 self-start lg:sticky lg:top-28">
                    <Card className="border border-slate-200 shadow-lg shadow-slate-200/40 bg-white rounded-3xl overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            title="Profit Analysis"
                            description="Enter your revenue and expenses to calculate true take-home pay."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            onReset={handleReset}
                        />
                        <CardContent className="p-4 md:p-6 space-y-3">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* Income Section */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label={`Total Revenue`}
                                        value={revenue}
                                        onChange={setRevenue}
                                        placeholder="50000.00"
                                        tooltip="Total sales receipts before any deductions."
                                        groupingTitle="Income Data"
                                        groupingIcon={DollarSign}
                                    />
                                </div>

                                {/* Expenses Section */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label={`Cost of Goods Sold (COGS)`}
                                        value={cogs}
                                        onChange={setCogs}
                                        placeholder="15000.00"
                                        tooltip="Cost of Goods Sold: Manufacturing, shipping to warehouse, etc."
                                        groupingTitle="Business Expenses"
                                        groupingIcon={Calculator}
                                    />
                                    <CalculatorInput
                                        label={`Ad Spend`}
                                        value={adSpend}
                                        onChange={setAdSpend}
                                        placeholder="5000.00"
                                        tooltip="Total marketing and advertising expenditure."
                                        isOptional={true}
                                    />
                                    <CalculatorInput
                                        label={`Overhead & Subscriptions`}
                                        value={overhead}
                                        onChange={setOverhead}
                                        placeholder="2000.00"
                                        tooltip="Rent, software, salaries, legal fees, etc."
                                        isOptional={true}
                                    />
                                    <CalculatorInput
                                        label={`Estimated Tax Rate`}
                                        value={taxRate}
                                        onChange={setTaxRate}
                                        placeholder="20"
                                        max={100}
                                        tooltip="Your effective tax rate on profit, from your accountant. Leave it blank to see profit before tax."
                                        isOptional={true}
                                        suffix="%"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-32">
                    <ResultSummaryCard
                        title="Profit Analysis"
                        primaryResult={{
                            label: "Net Profit",
                            value: netProfitValue,
                            isCurrency: true,
                            key: "net-profit"
                        }}
                        secondaryResults={[
                            {
                                key: "gross-profit",
                                label: "Gross Profit",
                                value: result?.grossProfit ?? 0,
                                isCurrency: true,
                                badge: `${(result?.grossMargin ?? 0).toFixed(2)}% margin`,
                                tooltip: "Revenue minus cost of goods sold.",
                                icon: DollarSign,
                            },
                            {
                                key: "operating-profit",
                                label: "Operating Profit",
                                value: result?.operatingProfit ?? 0,
                                isCurrency: true,
                                badge: `${(result?.operatingMargin ?? 0).toFixed(2)}% margin`,
                                tooltip: "Gross profit minus ad spend and overheads.",
                                icon: Calculator,
                            },
                            {
                                key: "net-margin",
                                label: "Net Margin",
                                value: netMargin.toFixed(2),
                                unit: "%",
                                tooltip: "The percentage of revenue that remains as profit after all costs are deducted.",
                                icon: Percent,
                            },
                            {
                                key: "tax-amount",
                                label: "Tax Amount",
                                value: taxAmount,
                                isCurrency: true,
                                tooltip: "Estimated income tax based on your operating profit and tax rate.",
                                icon: Receipt,
                            },
                            {
                                key: "total-expenses",
                                label: "Total Expenses",
                                value: result?.totalExpenses ?? 0,
                                isCurrency: true,
                                tooltip: "Sum of all business costs: COGS, Ad Spend, Overhead, and Tax.",
                                icon: CreditCard,
                            }
                        ]}
                        currency={currency}
                        isCalculated={result !== null}
                        profitLossKey="net-profit"
                        checklistItems={[
                            { key: 'revenue', label: 'Total Revenue', isComplete: revenue !== "" },
                            { key: 'cogs', label: 'Cost of Goods Sold', isComplete: cogs !== "" }
                        ]}
                        dynamicMessages={{
                            positive: "Your business made a net profit in this period.",
                            negative: "Your total expenses exceed your revenue. You are operating at a net loss.",
                            neutral: "Your business is breaking even. Revenue exactly covers all expenses."
                        }}
                    >
                        <ProfitAllocation
                            revenue={r}
                            cogs={c}
                            adSpend={ads}
                            overhead={over}
                            taxAmount={taxAmount}
                            netProfit={netProfitValue}
                            currency={currency}
                        />
                    </ResultSummaryCard>
                </div>
            </div>
        </FadeIn >
    )
}

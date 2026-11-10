"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Percent, BarChart3, AlertCircle } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { roasFromRevenue, revenueForTarget } from "./calc"
export function ReturnOnAdSpendCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [mode, setMode] = useState<"calculate-roas" | "calculate-revenue">("calculate-roas")
    // Common Input
    const [adSpend, setAdSpend] = useState<number | "">("")
    // Mode: Calculate ROAS (Standard)
    const [revenueFromAds, setRevenueFromAds] = useState<number | "">("")
    // Mode: Calculate Revenue (Planning)
    const [targetROAS, setTargetROAS] = useState<number | "">("")
    // Optional: profit margin before ads, for break-even ROAS and a verdict
    const [profitMargin, setProfitMargin] = useState<number | "">("")
    const handleReset = () => {
        setAdSpend("")
        setRevenueFromAds("")
        setTargetROAS("")
        setProfitMargin("")
        setMode("calculate-roas")
    }
    const val = (v: number | "") => (v === "" ? 0 : v)
    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"
    // --- Calculations ---
    const spend = val(adSpend)
    const result = mode === "calculate-roas"
        ? roasFromRevenue(adSpend, revenueFromAds, profitMargin)
        : revenueForTarget(adSpend, targetROAS, profitMargin)
    const roas = result?.roas ?? 0
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }
    // A verdict only when the margin is known: ROAS has to beat 1 ÷ margin to make money.
    const statusLabel = result?.status === "profitable" ? "Profitable" : result?.status === "loss" ? "Loss-making" : result?.status === "break-even" ? "Break-even" : undefined
    const statusColor = result?.status === "profitable" ? "text-blue-400" : result?.status === "loss" ? "text-red-400" : "text-amber-400"
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your ad spend details."
                            onReset={handleReset}
                            guideId="roas-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <CalculatorInput
                                label={`Total Ad Spend (${symbol})`}
                                value={adSpend}
                                onChange={setAdSpend}
                                placeholder="100.00"
                                max={1000000}
                                tooltip="The total amount spent on advertising campaigns."
                            />
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 dark:bg-slate-800/60 dark:border-slate-800">
                                <label className="text-sm font-medium text-slate-700 block dark:text-slate-200">I want to calculate:</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setMode("calculate-roas")}
                                        className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${mode === "calculate-roas"
                                            ? "bg-white border-blue-200 text-blue-700 shadow-sm ring-1 ring-blue-100"
                                            : "bg-transparent border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                            }`}
                                    >
                                        My Current ROAS
                                    </button>
                                    <button
                                        onClick={() => setMode("calculate-revenue")}
                                        className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${mode === "calculate-revenue"
                                            ? "bg-white border-blue-200 text-blue-700 shadow-sm ring-1 ring-blue-100"
                                            : "bg-transparent border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                            }`}
                                    >
                                        Revenue Goal
                                    </button>
                                </div>
                                {mode === "calculate-roas" ? (
                                    <div className="pt-2">
                                        <CalculatorInput
                                            label={`Revenue from Ads (${symbol})`}
                                            value={revenueFromAds}
                                            onChange={setRevenueFromAds}
                                            placeholder="500.00"
                                            max={10000000}
                                            tooltip="The total revenue generated directly from your ads."
                                        />
                                    </div>
                                ) : (
                                    <div className="pt-2">
                                        <CalculatorInput
                                            label="Target ROAS (x)"
                                            value={targetROAS}
                                            onChange={setTargetROAS}
                                            placeholder="4.0"
                                            max={100}
                                            step={0.1}
                                            tooltip="Your goal Return on Ad Spend. Example: 4.0 means you want to make $4 for every $1 spent."
                                        />
                                    </div>
                                )}
                            </div>
                            <CalculatorInput
                                label="Profit Margin"
                                suffix="%"
                                isOptional
                                value={profitMargin}
                                onChange={setProfitMargin}
                                placeholder="40.0"
                                min={0}
                                max={100}
                                tooltip="Your profit margin before ads, as a percentage of the sale price. Used for break-even ROAS and the verdict."
                            />
                        </CardContent>
                    </Card>
                </div>
                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    {/* Main Card */}
                    <ResultFeedbackCard
                        title={mode === "calculate-roas" ? "Return on Ad Spend (ROAS)" : "Target Revenue Required"}
                        titleLabel={statusLabel}
                        labelClassName={statusColor}
                        mainValue={
                            mode === "calculate-roas" ? (
                                <Counter value={roas} formatter={(v) => `${v.toFixed(2)}x`} />
                            ) : (
                                <Counter value={result?.revenue ?? 0} formatter={formatCurrency} key={currency} />
                            )
                        }
                        valueColor="text-white"
                        secondaryMetrics={[
                            {
                                label: mode === "calculate-roas" ? "ROAS %" : "Target ROAS (x)",
                                value: mode === "calculate-roas" ? (
                                    <Counter value={result?.roasPercent ?? 0} formatter={(v) => `${v.toFixed(0)}%`} />
                                ) : (
                                    <Counter value={val(targetROAS)} formatter={(v) => `${v.toFixed(2)}x`} />
                                )
                            },
                            {
                                label: "Break-even ROAS",
                                value: result?.breakEvenRoas != null ? `${result.breakEvenRoas.toFixed(2)}x` : "Add margin"
                            }
                        ]}
                    />
                    {/* Performance Breakdown Card */}
                    {result ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500 dark:bg-slate-900 dark:border-slate-800">
                            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
                                <p className="text-xs font-bold text-slate-600 tracking-wider dark:text-slate-300">Performance Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Ad Spend</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(spend)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Revenue Generated</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(result.revenue)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4 bg-slate-50 dark:bg-slate-800/60">
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Revenue Above Ad Spend</span>
                                    <span className={cn("text-base font-bold", result.revenueAboveSpend >= 0 ? "text-blue-600 dark:text-blue-400" : "text-red-700 dark:text-red-300")}>
                                        {formatCurrency(result.revenueAboveSpend)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Profit After Product Costs and Ads</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{result.profitAfterAds != null ? formatCurrency(result.profitAfterAds) : "Add your margin"}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center dark:bg-slate-900 dark:border-slate-800">
                            <p className="text-sm text-slate-600 dark:text-slate-300">Ready when you are: enter your ad spend and revenue to see the breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}

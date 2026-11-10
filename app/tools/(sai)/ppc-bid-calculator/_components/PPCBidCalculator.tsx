"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Target, DollarSign, TrendingUp, BarChart2, MousePointerClick } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn } from "@/app/tools/_shared/components"
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard"
import { cn } from "@/lib/utils"
import { calculateBids } from "./calc"

export function PPCBidCalculator() {
    const [currency, setCurrency] = useState<string>("USD")
    const [price, setPrice] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")
    const [profitMargin, setProfitMargin] = useState<number | "">("")
    const [targetACoS, setTargetACoS] = useState<number | "">("")
    const result = calculateBids(price, conversionRate, profitMargin, targetACoS)
    const recommendedBid = result?.recommendedBid ?? 0
    const breakevenBid = result?.breakEvenBid ?? 0
    const acosUsed = result?.acosUsed ?? 0
    const aboveMargin = result?.aboveMargin ?? false

    const handleReset = () => {
        setPrice("")
        setConversionRate("")
        setProfitMargin("")
        setTargetACoS("")
    }

    const isCalculated = result !== null

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your product price and campaign targets."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Product Data */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Product Data"
                                    groupingIcon={DollarSign}
                                    label="Product Price"
                                    isCurrency
                                    currency={currency}
                                    value={price}
                                    onChange={setPrice}
                                    placeholder="50.00"
                                    min={0}
                                    step={0.01}
                                    tooltip="The selling price of your product."
                                />
                                <CalculatorInput
                                    label="Conversion Rate"
                                    suffix="%"
                                    value={conversionRate}
                                    onChange={setConversionRate}
                                    placeholder="10.0"
                                    min={0}
                                    max={100}
                                    step={0.1}
                                    tooltip="Percentage of clicks that turn into purchases."
                                />
                                <CalculatorInput
                                    label="Profit Margin"
                                    suffix="%"
                                    value={profitMargin}
                                    onChange={setProfitMargin}
                                    placeholder="30.0"
                                    min={0}
                                    max={100}
                                    step={0.1}
                                    tooltip="Your profit margin before ad spend, as a percentage of the price. Sets the break-even bid."
                                />
                            </div>
                            {/* Group 2: Campaign Goals */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Campaign Goals"
                                    groupingIcon={Target}
                                    label="Target ACoS (optional)"
                                    suffix="%"
                                    value={targetACoS}
                                    onChange={setTargetACoS}
                                    placeholder="20.0"
                                    min={0}
                                    max={100}
                                    step={0.1}
                                    tooltip="Desired percentage of ad spend compared to sales."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        primaryResult={{
                            value: recommendedBid.toFixed(2),
                            isCurrency: true,
                            label: "Recommended Bid per Click",
                            key: "recommendedBid"
                        }}
                        secondaryResults={[
                            {
                                key: "breakevenBid",
                                label: "Break-even Bid",
                                value: breakevenBid.toFixed(2),
                                isCurrency: true,
                                icon: MousePointerClick,
                                tooltip: "Maximum bid where you make no profit and no loss."
                            }
                        ]}
                        currency={currency}
                        isCalculated={isCalculated}
                        emptyMessage="Calculate Bid"
                        liveBadgeText="Active bid"
                        liveBadgeColor="blue"
                    />

                    {/* Profitability Insight Card */}
                    <Card className="border border-slate-200/60 shadow-sm bg-[#F5F8FD] rounded-2xl overflow-hidden transition-all duration-300 dark:border-slate-800">
                        {/* Header: Matching Result Panel Format */}
                        <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5 dark:border-blue-900/50">
                                    <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-base sm:text-[16px] font-bold text-blue-800 leading-none dark:text-blue-200">
                                    Profitability Insight
                                </span>
                            </div>
                            {isCalculated && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={aboveMargin ? 'warning' : 'strategy'}
                                        initial={{ scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={cn(
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide shrink-0",
                                            aboveMargin
                                                ? "bg-rose-100/80 text-rose-700 border-rose-200/50 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-900/50"
                                                : "bg-blue-100/50 text-blue-700 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-900/50"
                                        )}
                                    >
                                        {aboveMargin ? "Profit warning" : "Active strategy"}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>

                        <div className="px-6 pb-6 pt-2">
                            <div className="flex items-center justify-between mb-3 text-xs font-bold tracking-widest">
                                <p className="text-slate-600 dark:text-slate-300 italic lowercase first-letter:">Aggressiveness Scale</p>
                                {isCalculated && (
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-md border",
                                        aboveMargin
                                            ? "text-rose-600 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50"
                                            : "text-blue-600 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-900/50"
                                    )}>
                                        {acosUsed.toFixed(1)}% ACoS
                                    </span>
                                )}
                            </div>
                            <div className="relative pt-2 pb-1">
                                <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden flex shadow-inner dark:bg-slate-700/50">
                                    <div className="h-full bg-blue-300 border-r border-white/40 shadow-sm dark:border-slate-800" style={{ width: '33%' }} />
                                    <div className="h-full bg-blue-500 border-r border-white/40 shadow-sm dark:border-slate-800" style={{ width: '33%' }} />
                                    <div className="h-full bg-amber-400 border-r border-white/40 shadow-sm dark:border-slate-800" style={{ width: '34%' }} />
                                </div>
                                {isCalculated && (
                                    <motion.div
                                        initial={{ left: 0 }}
                                        animate={{ 
                                            left: `${Math.min(Math.max((acosUsed / (Number(profitMargin) * 1.5)) * 100, 0), 100)}%` 
                                        }}
                                        className={cn(
                                            "absolute top-0 -mt-0.5 w-4 h-4 bg-white border-2 rounded-full shadow-md z-10 -ml-2 dark:bg-slate-900",
                                            aboveMargin
                                                ? "border-rose-600 ring-2 ring-rose-100"
                                                : "border-slate-800 dark:border-slate-700"
                                        )}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                            <div className="flex justify-between mt-2 text-xs font-bold text-slate-600 dark:text-slate-300 tracking-tight">
                                <span>Conservative</span>
                                <span>Balanced</span>
                                <span className={cn(
                                    isCalculated && aboveMargin && "text-rose-700 dark:text-rose-300"
                                )}>
                                    {isCalculated && aboveMargin ? "Loss-Making" : "Aggressive"}
                                </span>
                            </div>
                            {isCalculated && aboveMargin && (
                                <p className="mt-4 text-xs text-rose-600 font-medium leading-normal bg-white border border-rose-100 p-3 rounded-xl shadow-sm dark:text-rose-400 dark:bg-slate-900 dark:border-rose-900/50">
                                    <strong className="block mb-1">Caution: Unprofitable Bid</strong>
                                    Your target ACoS is higher than your profit margin, which means you are spending more on ads than you earn on the product.
                                </p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    )
}
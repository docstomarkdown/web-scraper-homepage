"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Box, Layers, Info, Calendar, Clock, ChevronsUpDown, ChevronDown, ChevronUp } from "lucide-react"
import { FadeIn, CalculatorInput, ResultSummaryCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { storageFee } from "./calc"

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export function StorageFeeCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [length, setLength] = useState<number | "">("")
    const [width, setWidth] = useState<number | "">("")
    const [height, setHeight] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number | "">("")
    const [duration, setDuration] = useState<number | "">("")

    const [showAdvanced, setShowAdvanced] = useState(false)
    const [startMonth, setStartMonth] = useState(0)
    const [sizeTier, setSizeTier] = useState<"standard" | "oversize" | "auto">("auto")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setLength("")
        setWidth("")
        setHeight("")
        setQuantity("")
        setDuration("")
        setStartMonth(0)
        setSizeTier("auto")
        setShowAdvanced(false)
    }

    // Each month is charged at its own season's rate, counted from the first month (calc.ts).
    const result = storageFee({
        length: val(length), width: val(width), height: val(height),
        units: val(quantity), months: val(duration), startMonth, tier: sizeTier,
    })
    const monthlyFee = result?.firstMonthFee ?? 0
    const longTermFee = result?.agedSurcharge ?? 0
    const totalCost = result?.total ?? 0

    let insightText = "Estimated rates; check the storage fees in Seller Central."
    if (result) {
        if (val(duration) > 6) insightText = "Units stored over six months pay the long-term surcharge on top. Estimated rates; check Seller Central."
        else if (result.peakMonths > 0) insightText = `${result.peakMonths} of these months fall in October to December, at the higher rate. Estimated rates; check Seller Central.`
    }

    const isCalculated = result !== null

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200/80 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter product dimensions and inventory details to estimate storage costs."
                            onReset={handleReset}
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex-1 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* 1. Product Size */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Length"
                                        value={length}
                                        onChange={setLength}
                                        placeholder="10"
                                        suffix="in"
                                        tooltip="Length of the unit in inches."
                                        groupingTitle="Product Size (inches)"
                                        groupingIcon={Box}
                                    />
                                    <CalculatorInput
                                        label="Width"
                                        value={width}
                                        onChange={setWidth}
                                        placeholder="Width"
                                        suffix="in"
                                        tooltip="Width of the unit in inches."
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        value={height}
                                        onChange={setHeight}
                                        placeholder="Height"
                                        suffix="in"
                                        tooltip="Height of the unit in inches."
                                    />
                                </div>

                                {/* 2. Inventory */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Units Stored"
                                        value={quantity}
                                        onChange={setQuantity}
                                        placeholder="1000"
                                        max={500000}
                                        tooltip="Total number of units stored in Amazon fulfillment centers."
                                        groupingTitle="Inventory"
                                        groupingIcon={Layers}
                                    />
                                    <CalculatorInput
                                        label="Storage Duration (Months)"
                                        value={duration}
                                        onChange={setDuration}
                                        placeholder="3"
                                        max={36}
                                        tooltip="How long you plan to store these units on average. Over 6 months adds a long-term surcharge."
                                    />
                                </div>

                                {/* Advanced Toggle */}
                                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 group select-none",
                                            showAdvanced
                                                ? "bg-blue-50/50 border-blue-200 shadow-sm dark:bg-blue-950/40 dark:border-blue-900/50"
                                                : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-slate-100 dark:bg-slate-800/60 dark:border-slate-800 dark:hover:border-blue-800 dark:hover:bg-slate-800"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                                showAdvanced ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" : "bg-white text-slate-400 group-hover:text-blue-500 dark:bg-slate-900 dark:text-slate-500 dark:group-hover:text-blue-400"
                                            )}>
                                                <ChevronsUpDown className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn("text-sm font-semibold transition-colors", showAdvanced ? "text-blue-700 dark:text-blue-400" : "text-slate-700 dark:text-slate-200")}>
                                                    Advanced Settings
                                                </span>
                                                <span className="text-xs text-slate-600 font-medium dark:text-slate-300">
                                                    First month & size tier
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "text-xs px-2 py-0.5 rounded-full font-bold tracking-wide transition-colors",
                                                showAdvanced ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                                            )}>
                                                Optional
                                            </span>
                                            {showAdvanced ? <ChevronUp className="w-4 h-4 text-blue-500 dark:text-blue-400" /> : <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />}
                                        </div>
                                    </div>

                                    {showAdvanced && (
                                        <TooltipProvider delayDuration={200}>
                                        <FadeIn className="pt-4 space-y-5 max-w-[520px] mx-auto w-full px-1">
                                            <div className="flex items-center gap-3 w-full relative z-10">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-sm font-medium text-slate-600/90 cursor-pointer py-1 dark:text-slate-300">First Month</label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" aria-label="About this field" className="text-slate-500 hover:text-blue-600 transition-colors cursor-help dark:text-slate-500 dark:hover:text-blue-400">
                                                                <Info className="h-3.5 w-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-slate-900 text-white border-slate-800 text-xs dark:bg-slate-800 dark:border-slate-700">
                                                            The month storage starts. October to December are charged at the higher rate, so each month uses its own season.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="w-36 sm:w-44 relative flex-shrink-0">
                                                    <Select value={String(startMonth)} onValueChange={(v: string) => setStartMonth(Number(v))}>
                                                        <SelectTrigger className="h-11 border-2 border-slate-200 bg-white font-semibold text-slate-600 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 hover:shadow-sm focus:border-blue-500 text-right w-full rounded-xl transition-all [&>span]:w-full [&>span]:text-right [&>span]:pr-3 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {MONTHS.map((m, i) => <SelectItem key={m} value={String(i)}>{m}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full relative z-10">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-sm font-medium text-slate-600/90 cursor-pointer py-1 dark:text-slate-300">Size Tier</label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" aria-label="About this field" className="text-slate-500 hover:text-blue-600 transition-colors cursor-help dark:text-slate-500 dark:hover:text-blue-400">
                                                                <Info className="h-3.5 w-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-slate-900 text-white border-slate-800 text-xs dark:bg-slate-800 dark:border-slate-700">
                                                            Auto-detect calculates if the product is Standard or Oversize based on dimensions.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="w-36 sm:w-44 relative flex-shrink-0">
                                                    <Select value={sizeTier} onValueChange={(v: "standard" | "oversize" | "auto") => setSizeTier(v)}>
                                                        <SelectTrigger className="h-11 border-2 border-slate-200 bg-white font-semibold text-slate-600 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 hover:shadow-sm focus:border-blue-500 text-right w-full rounded-xl transition-all [&>span]:w-full [&>span]:text-right [&>span]:pr-3 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="auto">Auto-detect</SelectItem>
                                                            <SelectItem value="standard">Standard</SelectItem>
                                                            <SelectItem value="oversize">Oversize</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </FadeIn>
                                        </TooltipProvider>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="h-full">
                        <ResultSummaryCard
                            title="Total Storage Cost"
                            currency={currency}
                            primaryResult={{
                                value: totalCost,
                                isCurrency: true,
                                key: "total_cost",
                                label: "Total cost for selected duration"
                            }}
                            secondaryResults={[
                                {
                                    key: "monthly_fee",
                                    label: `Fee in ${MONTHS[startMonth]}`,
                                    value: monthlyFee,
                                    isCurrency: true,
                                    tooltip: result ? `Per month: ${result.offPeakMonthly.toFixed(2)} January to September, ${result.peakMonthly.toFixed(2)} October to December.` : "Cost for the first month",
                                    icon: Calendar
                                },
                                ...(longTermFee > 0 ? [{
                                    key: "long_term_fee",
                                    label: "Long-Term Storage Fee",
                                    value: longTermFee,
                                    isCurrency: true,
                                    tooltip: "A flat estimate of $1.50 per cubic foot for each month beyond the sixth. Amazon's real surcharge rises in tiers with the inventory's age.",
                                    icon: Clock
                                }] : [])
                            ]}
                            showLiveBadge={true}
                            liveBadgeText="Estimate"
                            liveBadgeColor="slate"
                            isCalculated={isCalculated}
                            description={isCalculated ? insightText : "Fill in dimensions and inventory to see cost insights."}
                            emptyMessage="Storage Cost"
                            emptyResultLabel="Total Storage Cost"
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}
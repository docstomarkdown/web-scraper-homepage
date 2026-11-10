"use client"
import React, { useState, useMemo } from "react"
import { Scale, ShoppingCart, Warehouse, Package, Calculator, Repeat, CalendarDays, Wallet, Box, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import {
    FadeIn,
    CalculatorInput,
    CalculatorCardHeader,
    getCurrencySymbol,
    formatCurrencyValue,
} from "@/app/tools/_shared/components"
import { motion, AnimatePresence } from "framer-motion"
import { economicOrderQuantity } from "./calc"

interface EOQState {
    annualDemand: string | number
    orderCost: string | number
    holdingCost: string | number
    moq: string | number
}

const DEFAULT_STATE: EOQState = {
    annualDemand: "",
    orderCost: "",
    holdingCost: "",
    moq: "",
}

export function EOQCalculator() {
    const [values, setValues] = useState<EOQState>(DEFAULT_STATE)
    const [currency, setCurrency] = useState("USD")

    const handleInputChange = (field: keyof EOQState, value: string | number) => {
        setValues((prev) => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }

    const calc = useMemo(() => economicOrderQuantity({
        annualDemand: values.annualDemand === "" ? null : Number(values.annualDemand),
        orderCost: values.orderCost === "" ? null : Number(values.orderCost),
        holdingCost: values.holdingCost === "" ? null : Number(values.holdingCost),
        moq: values.moq === "" ? null : Number(values.moq),
    }), [values])
    const hasInputs = calc !== null
    const results = {
        eoq: calc ? Math.round(calc.eoq) : 0,
        annualOrders: calc ? Number(calc.ordersPerYear.toFixed(1)) : 0,
        orderFrequencyDays: calc ? Math.round(calc.daysBetweenOrders) : 0,
        annualOrderCost: calc?.annualOrderCost ?? 0,
        annualHoldingCost: calc?.annualHoldingCost ?? 0,
        totalCost: calc?.totalCost ?? 0,
    }

    const formatCurrency = (val: number) => {
        return formatCurrencyValue(val, currency, 2)
    }

    const formatCompact = (val: number, decimals = 2): string => {
        if (val === 0) return "0"
        if (Math.abs(val) < 100000)
            return val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals })
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 2 }).format(val)
    }

    const handleReset = () => setValues(DEFAULT_STATE)

    return (
        <FadeIn className="max-w-6xl mx-auto" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-6">
                
                {/* ═══ LEFT: Inputs ═══ */}
                <div className="lg:col-span-7 self-start lg:sticky lg:top-28">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col rounded-3xl h-fit dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            title="EOQ Configuration"
                            description="Enter your annual supply chain costs to find your optimal order quantity."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            guideId="how-to-use"
                            onReset={handleReset}
                            tooltip="See step-by-step instructions below"
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Annual Demand (Units)"
                                        value={values.annualDemand}
                                        onChange={(v) => handleInputChange("annualDemand", v)}
                                        placeholder="10000"
                                        type="number"
                                        tooltip="Total units your business sells or uses in one full year."
                                        groupingTitle="Demand"
                                        groupingIcon={Box}
                                    />
                                </div>
                                
                                <div className="space-y-0">
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5 pb-0">
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1 dark:bg-slate-800" />
                                    </div>
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Cost Per Order"
                                        value={values.orderCost}
                                        onChange={(v) => handleInputChange("orderCost", v)}
                                        placeholder="50"
                                        type="number"
                                        currency={currency}
                                        groupingTitle="Ordering Cost"
                                        groupingIcon={ShoppingCart}
                                        tooltip="Fixed cost every time you place a purchase order — includes shipping, admin, and supplier fees."
                                    />
                                </div>

                                <div className="space-y-0">
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5 pb-0">
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1 dark:bg-slate-800" />
                                    </div>
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Annual Holding Cost Per Unit"
                                        value={values.holdingCost}
                                        onChange={(v) => handleInputChange("holdingCost", v)}
                                        placeholder="2.50"
                                        type="number"
                                        currency={currency}
                                        groupingTitle="Holding Cost"
                                        groupingIcon={Warehouse}
                                        tooltip="Cost to store one unit for a full year — warehouse rent, insurance, and capital tied up in stock."
                                    />
                                </div>

                                <div className="space-y-0">
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5 pb-0">
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1 dark:bg-slate-800" />
                                    </div>
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Minimum Order Quantity (Units)"
                                        value={values.moq}
                                        onChange={(v) => handleInputChange("moq", v)}
                                        placeholder="1000"
                                        type="number"
                                        isOptional
                                        groupingTitle="Supplier Minimum"
                                        groupingIcon={Scale}
                                        tooltip="Your supplier's minimum order. If it is above the EOQ, the calculator shows what ordering the minimum costs you each year."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ═══ RIGHT: Results ═══ */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col gap-3"
                    >
                        <Card className="relative overflow-hidden border border-slate-200/60 shadow-sm rounded-2xl bg-[#F5F8FD] dark:bg-slate-900 flex flex-col dark:border-slate-800">
                            {/* Header */}
                            <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 dark:border-blue-900/50">
                                        <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-[15px] sm:text-[16px] font-bold text-blue-800 leading-none dark:text-blue-200">
                                        Results Panel
                                    </span>
                                </div>
                                <AnimatePresence mode="wait">
                                    {hasInputs ? (
                                        <motion.div
                                            key="live"
                                            initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/50 bg-emerald-100/50 text-xs font-bold text-emerald-700 dark:border-slate-800 dark:bg-emerald-900/40 dark:text-emerald-400"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                            Live
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="text-xs font-bold text-slate-600 dark:text-slate-300 px-2"
                                        >
                                            Awaiting input
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <AnimatePresence mode="wait">
                                {!hasInputs ? (
                                    /* ── EMPTY STATE ── */
                                    <motion.div
                                        key="empty"
                                        initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="relative z-10 px-6 pb-6 pt-2"
                                    >
                                        <div className="relative">
                                            {/* Frosted glass overlay */}
                                            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                                                <motion.div
                                                    initial={false}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.55, ease: "easeOut" }}
                                                    className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(59,130,246,0.12)] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 w-fit max-w-[320px] pointer-events-auto dark:bg-slate-900/80 dark:border-slate-800"
                                                >
                                                    <div className="relative flex items-center justify-center">
                                                        <span className="absolute w-11 h-11 rounded-xl bg-blue-400/15 animate-ping" style={{ animationDuration: "2.8s" }} />
                                                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/60 flex items-center justify-center text-blue-500 shadow-sm dark:from-blue-950/30 dark:to-blue-900/30 dark:border-blue-900/50 dark:text-blue-400">
                                                            <Package className="w-[18px] h-[18px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <div className="flex items-center gap-3 text-blue-500/70">
                                                            <svg className="w-5 h-3 shrink-0" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M9 19l-7-7 7-7" />
                                                                <path d="M2 12h36" />
                                                            </svg>
                                                            <p className="text-[12.5px] text-slate-600 dark:text-slate-300 font-semibold leading-snug whitespace-nowrap z-10">
                                                                Fill in the inputs to see your
                                                            </p>
                                                        </div>
                                                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/80 text-[11.5px] font-extrabold text-blue-600/90 tracking-wide shadow-sm shadow-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30">
                                                            Quantity Results
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Blurred skeleton */}
                                            <div className="blur-[2.5px] opacity-40 select-none pointer-events-none">
                                                <div className="flex flex-col items-center justify-center py-5 px-4 mb-2">
                                                    <div className="h-2.5 w-24 rounded-full bg-slate-200/60 mb-3 animate-pulse dark:bg-slate-700/60" />
                                                    <div className="h-12 w-40 rounded-xl bg-slate-200/50 mb-2 animate-pulse dark:bg-slate-700/50" style={{ animationDelay: "0.1s" }} />
                                                    <div className="flex flex-col items-center gap-1.5 mt-1">
                                                        <div className="h-2 w-44 rounded-full bg-slate-200/60 animate-pulse dark:bg-slate-700/60" style={{ animationDelay: "0.2s" }} />
                                                        <div className="h-2 w-32 rounded-full bg-slate-200/50 animate-pulse dark:bg-slate-700/50" style={{ animationDelay: "0.3s" }} />
                                                    </div>
                                                </div>
                                                <div className="h-px w-full bg-slate-200/40 my-4 dark:bg-slate-700/40" />
                                                <div className="space-y-3 px-2">
                                                    <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl dark:bg-slate-800/60 dark:border-slate-800">
                                                        <div className="h-2 w-20 rounded-full bg-slate-200/60 mb-3 animate-pulse dark:bg-slate-700/60" />
                                                        <div className="h-4 w-16 rounded-lg bg-slate-200/50 animate-pulse dark:bg-slate-700/50" />
                                                    </div>
                                                    <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl dark:bg-slate-800/60 dark:border-slate-800">
                                                        <div className="h-2 w-24 rounded-full bg-slate-200/60 mb-3 animate-pulse dark:bg-slate-700/60" style={{ animationDelay: "0.1s" }} />
                                                        <div className="h-4 w-12 rounded-lg bg-slate-200/50 animate-pulse dark:bg-slate-700/50" style={{ animationDelay: "0.15s" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* ── RESULTS STATE ── */
                                    <motion.div
                                        key="results"
                                        initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.45, ease: "easeInOut" }}
                                        className="flex flex-col gap-3 px-5 pb-5 pt-2"
                                    >
                                        {/* 1 — Units to order each time (Hero) */}
                                        <motion.div
                                            initial={{ scale: 0.97 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.05 }}
                                            className="relative flex flex-col items-center text-center py-6 px-4 bg-transparent"
                                        >
                                            <span className="text-xs font-black text-slate-600 dark:text-slate-300 tracking-[0.18em] leading-none mb-2">Optimal Order Quantity</span>
                                            <motion.span
                                                key={results.eoq}
                                                initial={{ y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-[3.25rem] font-black text-blue-600 tracking-tighter leading-none dark:text-blue-400"
                                            >
                                                {formatCompact(results.eoq, 0)}
                                            </motion.span>
                                            <span className="text-[1rem] font-bold text-slate-700 mt-1 dark:text-slate-200">Units to order each time</span>
                                            <p className="text-[11.5px] text-slate-600 dark:text-slate-300 font-medium mt-2">
                                                Based on your current costs and demand.
                                            </p>
                                        </motion.div>

                                        {/* Card 1: Annual Orders */}
                                        <motion.div
                                            initial={{ y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.08 }}
                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] mb-1 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Repeat className="w-4 h-4 text-blue-500 flex-shrink-0 dark:text-blue-400" />
                                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Orders Per Year</span>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" tabIndex={-1} className="text-slate-300 hover:text-blue-500 transition-colors cursor-help shrink-0 dark:text-slate-300 dark:hover:text-blue-400">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="bg-slate-900 border-slate-800 text-white text-xs max-w-xs p-3 shadow-xl rounded-xl font-medium z-[110] dark:bg-slate-800 dark:border-slate-700">
                                                            How many times you should place orders annually
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div className="pl-6 pt-1">
                                                <span className="text-[18px] font-black text-slate-800 dark:text-slate-100">
                                                    {formatCompact(results.annualOrders, 1)} <span className="font-normal text-[15px]">Orders</span>
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Card 2: Order Frequency */}
                                        <motion.div
                                            initial={{ y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.1 }}
                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] mb-1 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <CalendarDays className="w-4 h-4 text-emerald-500 flex-shrink-0 dark:text-emerald-400" />
                                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Order Frequency (Days Between Orders)</span>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" tabIndex={-1} className="text-slate-300 hover:text-blue-500 transition-colors cursor-help shrink-0 dark:text-slate-300 dark:hover:text-blue-400">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="bg-slate-900 border-slate-800 text-white text-xs max-w-xs p-3 shadow-xl rounded-xl font-medium z-[110] dark:bg-slate-800 dark:border-slate-700">
                                                            When you should reorder
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div className="pl-6 pt-1">
                                                <span className="text-[18px] font-black text-slate-800 dark:text-slate-100">
                                                    Every {formatCompact(results.orderFrequencyDays, 0)} <span className="font-normal text-[15px]">Days</span>
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Card 3: Total Inventory Cost (Nested) */}
                                        <motion.div
                                            initial={{ y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.15 }}
                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] mb-1 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <Wallet className="w-4 h-4 text-blue-500 flex-shrink-0 dark:text-blue-400" />
                                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                                        Total Inventory Cost
                                                    </span>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" tabIndex={-1} className="text-slate-300 hover:text-blue-500 transition-colors cursor-help shrink-0 dark:text-slate-300 dark:hover:text-blue-400">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="bg-slate-900 border-slate-800 text-white text-xs max-w-xs p-3 shadow-xl rounded-xl font-medium z-[110] dark:bg-slate-800 dark:border-slate-700">
                                                            Total cost to manage inventory per year
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <span className="text-[15px] font-bold text-slate-800 font-mono dark:text-slate-100">
                                                    {formatCurrency(results.totalCost)}
                                                </span>
                                            </div>

                                            <div className="pl-6 space-y-2 mt-1">
                                                {/* Ordering Cost Sub-item */}
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-sm text-slate-600 font-medium dark:text-slate-300">Ordering Cost</span>
                                                    <span className="text-[14px] font-bold text-slate-600 font-mono dark:text-slate-300">
                                                        {formatCurrency(results.annualOrderCost)}
                                                    </span>
                                                </div>

                                                {/* Holding Cost Sub-item */}
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-sm text-slate-600 font-medium dark:text-slate-300">Holding Cost</span>
                                                    <span className="text-[14px] font-bold text-slate-600 font-mono dark:text-slate-300">
                                                        {formatCurrency(results.annualHoldingCost)}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {calc?.moq && (
                                            <div className="bg-white border border-slate-200/70 rounded-xl p-4 mb-1 dark:bg-slate-900 dark:border-slate-800">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Scale className="w-4 h-4 text-blue-500 flex-shrink-0 dark:text-blue-400" />
                                                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">At your minimum of {calc.moq.quantity.toLocaleString()} units</span>
                                                    </div>
                                                    <span className="text-[15px] font-bold text-slate-800 font-mono dark:text-slate-100">
                                                        {formatCurrency(calc.moq.totalCost)}
                                                    </span>
                                                </div>
                                                <p className="pl-6 text-sm text-slate-600 dark:text-slate-300">
                                                    {formatCurrency(calc.moq.extraCost)} a year more than ordering the EOQ, with {formatCompact(Number(calc.moq.ordersPerYear.toFixed(1)), 1)} orders a year.
                                                </p>
                                            </div>
                                        )}

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </div>

            </div>
        </FadeIn>
    )
}


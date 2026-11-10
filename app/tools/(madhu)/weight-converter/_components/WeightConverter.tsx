"use client"
import React, { useState, useEffect, useMemo } from "react"
import { Scale, RefreshCw, Info, Package } from "lucide-react";
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CalculatorCardHeader, CalculatorInput } from "../../../_shared/components"
import { motion, AnimatePresence } from "framer-motion"
import { convertWeight, type WeightUnit, type ConversionResult } from "./calc"



const UNIT_NAMES: Record<WeightUnit, string> = {
    oz: "Ounces",
    lbs: "Pounds",
    g: "Grams",
    kg: "Kilograms"
}

const UNIT_ABBR: Record<WeightUnit, string> = {
    oz: "oz",
    lbs: "lb",
    g: "g",
    kg: "kg"
}

export function WeightConverter() {
    const [inputValue, setInputValue] = useState<string>("")
    const [inputUnit, setInputUnit] = useState<WeightUnit>("lbs")
    const [targetUnit, setTargetUnit] = useState<WeightUnit>("kg")

    // Smart default switching
    useEffect(() => {
        if (inputUnit === targetUnit) {
            const defaults: Record<WeightUnit, WeightUnit> = {
                'lbs': 'kg', 'oz': 'g', 'kg': 'lbs', 'g': 'oz'
            }
            setTargetUnit(defaults[inputUnit])
        }
    }, [inputUnit, targetUnit])

    const conversions = useMemo((): ConversionResult => convertWeight(parseFloat(inputValue), inputUnit) ?? { oz: 0, lbs: 0, g: 0, kg: 0 }, [inputValue, inputUnit])

    const formatCompact = (val: number, decimals = 4): string => {
        if (val === 0) return "0"
        if (Math.abs(val) < 100000)
            return val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals })
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 2 }).format(val)
    }

    const secondaryUnits = useMemo(() => {
        const allUnits: WeightUnit[] = ["lbs", "oz", "kg", "g"]
        return allUnits.filter(u => u !== inputUnit && u !== targetUnit)
    }, [inputUnit, targetUnit])

    const isCalculated = convertWeight(parseFloat(inputValue), inputUnit) !== null

    const handleReset = () => {
        setInputValue("")
        setInputUnit("lbs")
        setTargetUnit("kg")
    }

    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* ═══ LEFT COLUMN: Input Panel ═══ */}
                <div className="lg:col-span-7 self-start lg:sticky lg:top-28">
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden bg-white flex flex-col dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your product's weight and pick the unit you need it in."
                            guideId="how-to-use"
                            tooltip="How to use this converter"
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">

                                {/* ── Weight Configuration ── */}
                                <div className="weight-config-group space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Input Weight"
                                        value={inputValue}
                                        onChange={(v) => setInputValue(v.toString())}
                                        placeholder="12.00"
                                        type="number"
                                        tooltip="Enter the weight value you wish to convert"
                                        groupingTitle="Weight Configuration"
                                        groupingIcon={Scale}
                                    />
                                    {/* Weight Unit Selector */}
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5">
                                        <div className="flex items-center gap-3 w-full relative z-10">
                                            <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1 dark:text-slate-300">Weight Unit</label>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button type="button" tabIndex={-1} aria-label="More about this field" className="text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors cursor-help shrink-0 dark:hover:text-blue-400">
                                                            <Info className="w-3.5 h-3.5" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs text-sm font-normal bg-slate-900 text-white border-slate-800 dark:bg-slate-800 dark:border-slate-700">
                                                        Select the unit of measurement for the weight value you&apos;re entering.
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-11 font-sans w-36 sm:w-44 dark:bg-slate-800 dark:border-slate-800">
                                                {(["lbs", "oz", "kg", "g"] as WeightUnit[]).map((u) => (
                                                    <button
                                                        key={u}
                                                        onClick={() => setInputUnit(u)}
                                                        className={cn(
                                                            "px-3 h-full rounded-md text-sm font-bold transition-all flex-1 flex items-center justify-center",
                                                            inputUnit === u
                                                                ? "bg-white text-blue-600 shadow-sm border border-blue-200 dark:bg-slate-900 dark:text-blue-400 dark:border-blue-900/50"
                                                                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                                        )}
                                                    >{u}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Conversion Target ── */}
                                <div className="space-y-0">
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5 pb-0">
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1 dark:bg-slate-800" />
                                        <div className="relative w-full">
                                            <div className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0" style={{ top: '14px', bottom: '0px' }} />
                                            <div className="flex items-center gap-2 -ml-[33px] mb-0.5 relative h-7 z-10">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10 dark:bg-blue-950/40 dark:ring-slate-900">
                                                    <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <span className="text-[16px] font-bold text-slate-600 capitalize z-10 tracking-tight flex-1 dark:text-slate-300">Conversion Target</span>
                                            </div>
                                            <div className="flex items-center gap-3 w-full relative z-10 mt-3">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1 dark:text-slate-300">Target Unit</label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" tabIndex={-1} aria-label="More about this field" className="text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors cursor-help shrink-0 dark:hover:text-blue-400">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-sm font-normal bg-slate-900 text-white border-slate-800 dark:bg-slate-800 dark:border-slate-700">
                                                            Select the unit you want to convert your weight to.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-11 font-sans w-36 sm:w-44 dark:bg-slate-800 dark:border-slate-800">
                                                    {(["lbs", "oz", "kg", "g"] as WeightUnit[]).map((u) => (
                                                        <button
                                                            key={u}
                                                            onClick={() => setTargetUnit(u)}
                                                            disabled={inputUnit === u}
                                                            className={cn(
                                                                "px-3 h-full rounded-md text-sm font-bold transition-all flex-1 flex items-center justify-center",
                                                                targetUnit === u
                                                                    ? "bg-white text-blue-600 shadow-sm border border-blue-200 dark:bg-slate-900 dark:text-blue-400 dark:border-blue-900/50"
                                                                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                                                                inputUnit === u && "opacity-30 cursor-not-allowed"
                                                            )}
                                                        >{u}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ═══ RIGHT COLUMN: Results Panel ═══ */}
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
                                        <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-[15px] sm:text-[16px] font-bold text-blue-800 leading-none dark:text-blue-200">
                                        Results Panel
                                    </span>
                                </div>
                                <AnimatePresence mode="wait">
                                    {isCalculated ? (
                                        <motion.div
                                            key="live"
                                            initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-blue-50/80 border-blue-200/50 text-xs font-bold text-blue-600 shrink-0 dark:bg-blue-950/40 dark:border-blue-900/50 dark:text-blue-400"
                                        >
                                            {UNIT_ABBR[inputUnit]} → {UNIT_ABBR[targetUnit]}
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
                                {!isCalculated ? (
                                    /* ── EMPTY STATE (UPC/GTIN style: frosted overlay + blurred skeleton) ── */
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
                                                            Conversion Results
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
                                        {/* 1 — Target Conversion (Valid-like Hero) */}
                                        <motion.div
                                            initial={{ scale: 0.97 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.05 }}
                                            className="relative flex flex-col items-center text-center py-6 px-4 bg-transparent"
                                        >
                                            <span className="text-xs font-black text-slate-600 dark:text-slate-300 tracking-[0.18em] leading-none mb-2">Target Conversion</span>
                                            <motion.span
                                                key={`${conversions[targetUnit]}-${targetUnit}`}
                                                initial={{ y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-[3.25rem] font-black text-blue-600 tracking-tighter leading-none dark:text-blue-400"
                                            >
                                                {formatCompact(conversions[targetUnit], 4)}
                                            </motion.span>
                                            <span className="text-[1rem] font-bold text-slate-700 mt-1 dark:text-slate-200">{UNIT_NAMES[targetUnit]}</span>
                                            <p className="text-[11.5px] text-slate-600 dark:text-slate-300 font-medium mt-2">
                                                from {inputValue} {UNIT_NAMES[inputUnit]}
                                            </p>
                                        </motion.div>

                                        {/* 2 — Separated Cards Style */}
                                        
                                        {/* Card 1: Other Units */}
                                        <motion.div
                                            initial={{ y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.1 }}
                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <RefreshCw className="w-4 h-4 text-blue-500 flex-shrink-0 dark:text-blue-400" />
                                                <span className="text-sm sm:text-[14px] font-bold text-slate-600 dark:text-slate-300">Other Units</span>
                                            </div>
                                            <div className="pl-7 space-y-2">
                                                {secondaryUnits.map((unit) => (
                                                    <div key={unit} className="flex items-center justify-between mt-1">
                                                        <span className="text-xs text-slate-600 font-medium dark:text-slate-300">{UNIT_NAMES[unit]}</span>
                                                        <span className="font-bold tracking-tight text-[16px] sm:text-[17px] text-slate-700 flex items-baseline dark:text-slate-200">
                                                            {formatCompact(conversions[unit], 4)}
                                                            <span className="font-medium text-[0.6em] ml-1">{UNIT_ABBR[unit]}</span>
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2 dark:border-slate-800">
                                                    <span className="text-xs text-slate-600 font-medium dark:text-slate-300">
                                                        {UNIT_NAMES[inputUnit]} <span className="text-blue-400 text-xs ml-1">(input)</span>
                                                    </span>
                                                    <span className="font-bold tracking-tight text-[16px] sm:text-[17px] text-slate-700 flex items-baseline dark:text-slate-200">
                                                        {formatCompact(conversions[inputUnit], 4)}
                                                        <span className="font-medium text-[0.6em] ml-1">{UNIT_ABBR[inputUnit]}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </div>

            </div>
        </div>
    )
}

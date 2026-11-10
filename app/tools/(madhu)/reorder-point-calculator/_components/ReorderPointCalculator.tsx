"use client"
import React, { useState, useMemo } from "react"
import {
    TrendingUp,
    ShieldCheck,
    CalendarClock,
    Hourglass
} from "lucide-react"
import { ResultSummaryCard, CalculatorInput, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { reorderPoint, type SafetyMode } from "./calc"
interface ROPState {
    salesVelocity: number | ""
    leadTime: number | ""
    safetyStock: number | ""
    currentStock: number | ""
}
const DEFAULT_STATE: ROPState = {
    salesVelocity: "",
    leadTime: "",
    safetyStock: "",
    currentStock: ""
}
const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 1 })
export function ReorderPointCalculator() {
    const [values, setValues] = useState<ROPState>(DEFAULT_STATE)
    const [safetyMode, setSafetyMode] = useState<SafetyMode>("units")
    const handleInputChange = (field: keyof ROPState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    }
    const num = (v: number | "") => (v === "" ? null : v)
    const results = useMemo(() => reorderPoint({
        dailySales: num(values.salesVelocity),
        leadTimeDays: num(values.leadTime),
        safety: num(values.safetyStock),
        safetyMode,
        currentStock: num(values.currentStock),
    }), [values, safetyMode])
    const hasInputs = results !== null
    const status = results?.status ?? null
    const handleReset = () => {
        setValues(DEFAULT_STATE)
        setSafetyMode("units")
    }
    const modeButton = (mode: SafetyMode, label: string) => (
        <button
            type="button"
            onClick={() => setSafetyMode(mode)}
            aria-pressed={safetyMode === mode}
            className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors",
                safetyMode === mode
                    ? "bg-[#2772ED] text-white border-[#2772ED]"
                    : "bg-white text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700"
            )}
        >
            {label}
        </button>
    )
    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
                {/* Left Column: Smart Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col rounded-3xl h-fit dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            title="Calculator Inputs"
                            description="Enter daily sales, delivery time and safety stock. Add current stock to see whether to order now."
                            tooltip="The reorder point is the stock level that triggers your next order."
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-3">
                                <CalculatorInput
                                    label="Average Daily Units Sold"
                                    value={values.salesVelocity}
                                    onChange={(v) => handleInputChange('salesVelocity', v)}
                                    placeholder="25"
                                    step={0.1}
                                    tooltip="The average number of units your business sells each day."
                                />
                                <CalculatorInput
                                    label="Delivery Time (Days)"
                                    value={values.leadTime}
                                    onChange={(v) => handleInputChange('leadTime', v)}
                                    placeholder="14"
                                    tooltip="The total time (in days) from placing an order to having the stock available for sale."
                                />
                                <CalculatorInput
                                    label={safetyMode === "units" ? "Safety Stock (Units)" : "Safety Stock (Days of Sales)"}
                                    value={values.safetyStock}
                                    onChange={(v) => handleInputChange('safetyStock', v)}
                                    placeholder={safetyMode === "units" ? "50" : "7"}
                                    tooltip="Extra stock kept for late deliveries or a busy week. Enter it as units, or as days of sales and the calculator multiplies by daily sales."
                                    isOptional
                                    rowAction={
                                        <div className="flex gap-1" role="group" aria-label="Safety stock unit">
                                            {modeButton("units", "Units")}
                                            {modeButton("days", "Days")}
                                        </div>
                                    }
                                />
                                <CalculatorInput
                                    label="Current Stock (Units)"
                                    value={values.currentStock}
                                    onChange={(v) => handleInputChange('currentStock', v)}
                                    placeholder="500"
                                    tooltip="Units on hand now. With it, the calculator says whether to order now and how many days are left before you must."
                                    isOptional
                                />
                            </div>

                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        title="Reorder point"
                        description={status
                            ? (status.orderNow
                                ? "Your stock is at or below the reorder point. Place the order now."
                                : `Not yet. At this rate you reach the reorder point in ${status.daysUntilReorder} days.`)
                            : "Place your next order when inventory drops to this amount."}
                        isCalculated={hasInputs}
                        showLiveBadge={status !== null}
                        liveBadgeText={status ? (status.orderNow ? "Order now" : "Not yet") : undefined}
                        liveBadgeColor={status?.orderNow ? "amber" : "emerald"}
                        checklistItems={[
                            { label: "Enter Daily Units Sold", isComplete: values.salesVelocity !== "" },
                            { label: "Enter Delivery Time", isComplete: values.leadTime !== "" }
                        ]}
                        primaryResult={{
                            value: results ? results.reorderPoint.toLocaleString() : 0,
                            label: "Units to trigger reorder",
                            unit: "Units"
                        }}
                        secondaryResults={[
                            {
                                key: "demand",
                                label: "Demand During Delivery Time",
                                tooltip: "Estimated units sold during lead time (Daily Units Sold × Delivery Time).",
                                value: results ? fmt(results.leadTimeDemand) : 0,
                                unit: "Units",
                                icon: TrendingUp,
                            },
                            {
                                key: "safety",
                                label: "Safety Stock",
                                tooltip: "The buffer for delays or demand spikes, in units.",
                                value: results ? fmt(results.safetyUnits) : 0,
                                unit: "Units",
                                icon: ShieldCheck,
                            },
                            {
                                key: "coverage",
                                label: "Days of Sales Covered",
                                tooltip: "Reorder point ÷ daily units sold.",
                                value: results ? fmt(results.coverageDays) : 0,
                                unit: "Days",
                                icon: CalendarClock,
                            },
                            ...(status ? [{
                                key: "until",
                                label: "Days Until Reorder",
                                tooltip: "(Current stock − reorder point) ÷ daily units sold, rounded down. 0 means order today.",
                                value: status.daysUntilReorder,
                                unit: "Days",
                                icon: Hourglass,
                            }] : [])
                        ]}
                        emptyMessage="Reorder Point"
                        emptyResultLabel="Reorder Point"
                    />
                </div>
            </div>
        </div>
    )
}

"use client"
import React, { useState, useMemo } from "react"
import { Calendar, AlertCircle, CheckCircle2, Package } from "lucide-react"
import { ResultDateCard, CalculatorInput, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"
import { stockRunway, stockOutDate } from "./calc"

interface RunwayState {
    currentStock: number | ""
    unitsSold: number | ""
    salesPeriodDays: number | ""
    safetyStock: number | ""
    leadTime: number | ""
}

const DEFAULT_STATE: RunwayState = {
    currentStock: "",
    unitsSold: "",
    salesPeriodDays: "",
    safetyStock: "",
    leadTime: "",
}

/** Days of inventory remaining: stock on hand ÷ daily sales, for a sales figure over any number of days. */
export function StockRunway() {
    const [values, setValues] = useState<RunwayState>(DEFAULT_STATE)
    const set = (field: keyof RunwayState, value: string | number) =>
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    const n = (v: number | "") => (v === "" ? null : v)

    const result = useMemo(() => stockRunway({
        stock: n(values.currentStock),
        unitsSold: n(values.unitsSold),
        salesPeriodDays: n(values.salesPeriodDays),
        safetyStock: n(values.safetyStock),
        leadTimeDays: n(values.leadTime),
    }), [values])
    const hasInputs = result !== null
    const date = result ? stockOutDate(new Date(), result.daysRemaining) : null
    const formattedDate = date
        ? date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
        : "More than 10 years away"
    const fmt = (x: number) => x.toLocaleString(undefined, { maximumFractionDigits: 1 })

    const badge = (() => {
        if (!result || result.orderWithinDays === null) return undefined
        if (result.orderWithinDays <= 0) return {
            text: "Order now",
            icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
            bgClass: "bg-amber-50 dark:bg-amber-950/40",
            textClass: "text-amber-700 dark:text-amber-400",
            borderClass: "border-amber-200 dark:border-amber-900/50",
        }
        return {
            text: `Order within ${result.orderWithinDays} days`,
            icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
            bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
            textClass: "text-emerald-700 dark:text-emerald-400",
            borderClass: "border-emerald-200 dark:border-emerald-900/50",
        }
    })()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
            <div className="lg:col-span-7">
                <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-[2.5rem] dark:border-slate-800 dark:bg-slate-900">
                    <CalculatorCardHeader
                        title="Days of Inventory"
                        description="See how many days your current stock lasts at your sales rate."
                        guideId="how-to-use"
                        onReset={() => setValues(DEFAULT_STATE)}
                    />
                    <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                        <div className="space-y-3">
                            <CalculatorInput
                                hideSeparator={true}
                                label="Total Current Stock (Units)"
                                value={values.currentStock}
                                onChange={(v) => set('currentStock', v)}
                                placeholder="5000"
                                tooltip="The total number of units available to sell today."
                                groupingTitle="Stock & Sales Details"
                                groupingIcon={Package}
                            />
                            <CalculatorInput
                                label="Units Sold"
                                value={values.unitsSold}
                                onChange={(v) => set('unitsSold', v)}
                                placeholder="150"
                                tooltip="Units sold over the days you enter below."
                            />
                            <CalculatorInput
                                label="Over How Many Days"
                                value={values.salesPeriodDays}
                                onChange={(v) => set('salesPeriodDays', v)}
                                placeholder="1"
                                tooltip="The days the units-sold figure covers: 1 for a daily average, 7 for a week, 31 for a 31-day month."
                                hint="1 for a daily figure, 7 for a week, the month's own days for a month"
                            />
                            <CalculatorInput
                                label="Safety Buffer Units"
                                value={values.safetyStock}
                                onChange={(v) => set('safetyStock', v)}
                                placeholder="500"
                                tooltip="Units you keep back for emergencies. They are excluded from the usable days."
                                isOptional={true}
                            />
                            <CalculatorInput
                                label="Supplier Lead Time (Days)"
                                value={values.leadTime}
                                onChange={(v) => set('leadTime', v)}
                                placeholder="21"
                                tooltip="Days from placing an order to stock on the shelf. With it, the calculator says how many days you have to place the order."
                                isOptional={true}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-5 space-y-3 flex flex-col">
                <ResultDateCard
                    title="Days of Inventory Remaining"
                    primaryResult={{
                        value: result ? Math.floor(result.daysRemaining) : 0,
                        unit: "Days",
                        label: "Days of Inventory Remaining",
                    }}
                    dateSection={{
                        icon: <Calendar className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
                        label: "Expected Stock-Out Date",
                        value: formattedDate,
                        emptyText: "Waiting for inputs...",
                    }}
                    infoCard={{
                        title: "Actionable Stock Runway",
                        children: (
                            <p className="text-sm font-medium text-slate-600 leading-relaxed dark:text-slate-300">
                                At {result ? fmt(result.dailySales) : 0} units a day, you have{" "}
                                <span className="text-blue-600 font-bold dark:text-blue-400">
                                    {result ? Math.floor(result.usableDays) : 0} days
                                </span>{" "}
                                of stock before you reach your safety buffer
                                {result && result.orderWithinDays !== null && (
                                    result.orderWithinDays <= 0
                                        ? ". With your lead time, order today."
                                        : `. With your lead time, place the order within ${result.orderWithinDays} days.`
                                )}
                            </p>
                        ),
                    }}
                    isCalculated={hasInputs}
                    emptyResultLabel="Days of Inventory"
                    className="flex-shrink-0"
                    showLiveBadge={badge !== undefined}
                    customBadge={badge}
                    checklistItems={[
                        { label: 'Total Current Stock', isComplete: values.currentStock !== "" && Number(values.currentStock) > 0 },
                        { label: 'Units Sold', isComplete: values.unitsSold !== "" && Number(values.unitsSold) > 0 },
                        { label: 'Days Covered', isComplete: values.salesPeriodDays !== "" && Number(values.salesPeriodDays) > 0 },
                    ]}
                />
            </div>
        </div>
    )
}

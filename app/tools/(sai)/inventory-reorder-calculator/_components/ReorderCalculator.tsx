"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2, Clock, Package } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"
export function ReorderCalculator() {
    const [dailySales, setDailySales] = useState<number | "">("")
    const [leadTime, setLeadTime] = useState<number | "">("")
    const [safetyStockDays, setSafetyStockDays] = useState<number | "">("")
    const [currentStock, setCurrentStock] = useState<number | "">("")
    const handleReset = () => {
        setDailySales("")
        setLeadTime("")
        setSafetyStockDays("")
        setCurrentStock("")
    }
    const val = (v: number | "") => (v === "" ? 0 : v)
    // --- Calculations ---
    const sales = val(dailySales)
    const lead = val(leadTime)
    const safetyDays = val(safetyStockDays)
    const stock = val(currentStock)
    const leadTimeDemand = sales * lead
    const safetyStockUnits = sales * safetyDays
    const reorderPoint = Math.ceil(leadTimeDemand + safetyStockUnits)
    const isReorderNeeded = stock <= reorderPoint
    // Days until reorder point is reached
    // If stock > reorderPoint, we have (stock - reorderPoint) surplus units.
    // Days = Surplus / DailySales
    let daysUntilReorder = 0
    if (sales > 0 && stock > reorderPoint) {
        daysUntilReorder = Math.floor((stock - reorderPoint) / sales)
    } else if (stock <= reorderPoint) {
        daysUntilReorder = 0 // Already there
    }
    const titleLabel = isReorderNeeded ? "Order Now" : "Stock Healthy"
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your sales velocity and lead times."
                            onReset={handleReset}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <CalculatorInput
                                label="Average Daily Sales (Units)"
                                value={dailySales}
                                onChange={setDailySales}
                                placeholder="10"
                                tooltip="The average number of units you sell per day."
                            />
                            <CalculatorInput
                                label="Lead Time (Days)"
                                value={leadTime}
                                onChange={setLeadTime}
                                placeholder="14"
                                tooltip="Number of days from placing an order to receiving it."
                            />
                            <CalculatorInput
                                label="Safety Stock Buffer (Days)"
                                value={safetyStockDays}
                                onChange={setSafetyStockDays}
                                placeholder="7"
                                tooltip="Extra days of stock to hold for emergencies/delays."
                            />
                            <CalculatorInput
                                label="Current Stock Level (Units)"
                                value={currentStock}
                                onChange={setCurrentStock}
                                placeholder="200"
                                tooltip="Total units currently in your warehouse."
                            />
                        </CardContent>
                    </Card>
                </div>
                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Reorder Point"
                        titleLabel={titleLabel}
                        labelClassName={!isReorderNeeded ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-900/50 dark:text-blue-400" : "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-900/50 dark:text-red-400"}
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <Counter value={reorderPoint} />
                                <span className="text-2xl font-normal opacity-80">Units</span>
                            </div>
                        }
                        valueColor="text-white"
                        mainMetricLabel="Status"
                        mainMetricValue={isReorderNeeded ? "Place Order" : `~${daysUntilReorder} Days Left`}
                        secondaryMetrics={[
                            {
                                label: "Lead Time Demand",
                                value: <><Counter value={leadTimeDemand} /> Units</>,
                                color: "text-slate-600 dark:text-slate-300"
                            },
                            {
                                label: "Safety Stock",
                                value: <><Counter value={safetyStockUnits} /> Units</>,
                                color: "text-blue-400"
                            }
                        ]}
                    />
                    {/* Breakdown Card */}
                    {sales > 0 || lead > 0 || safetyDays > 0 || stock > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500 dark:bg-slate-900 dark:border-slate-800">
                            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
                                <p className="text-xs font-bold text-slate-600 tracking-wider dark:text-slate-300">Reorder Calculation</p>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Lead Time Demand</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100"><Counter value={leadTimeDemand} /> units</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Safety Stock</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100"><Counter value={safetyStockUnits} /> units</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5 bg-blue-50/20 dark:bg-blue-950/40">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Reorder Point</span>
                                    <span className="text-base font-bold text-blue-700 dark:text-blue-300">{reorderPoint.toLocaleString()} units</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center dark:bg-slate-900 dark:border-slate-800">
                            <p className="text-sm text-slate-600 dark:text-slate-300">Enter sales and lead times to see reorder calculation.</p>
                        </div>
                    )}
                    {/* Analysis Card */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 dark:bg-slate-900 dark:border-slate-800">
                        <div className="flex items-start gap-3">
                            {isReorderNeeded ?
                                <AlertTriangle className="w-5 h-5 text-red-700 dark:text-red-300 mt-0.5 dark:text-red-400" /> :
                                <CheckCircle2 className="w-5 h-5 text-blue-700 dark:text-blue-300 mt-0.5 dark:text-blue-400" />
                            }
                            <div>
                                <h2 className="font-semibold text-slate-800 mb-1 dark:text-slate-100">
                                    {isReorderNeeded ? "Reorder Action Needed" : "Inventory Healthy"}
                                </h2>
                                <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-300">
                                    {isReorderNeeded ? (
                                        <>
                                            Your current stock ({stock}) is below the Reorder Point ({reorderPoint}).
                                            You should place an order immediately to avoid a stockout during the <strong>{lead} day</strong> lead time.
                                        </>
                                    ) : (
                                        <>
                                            You have sufficient stock. Based on your daily sales, you won&apos;t need to reorder for approximately <strong>{daysUntilReorder} days</strong>.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}

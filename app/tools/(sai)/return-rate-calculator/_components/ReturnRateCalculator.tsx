"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, RotateCcw, AlertTriangle, DollarSign, Calculator } from "lucide-react";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components";
import { cn } from "@/lib/utils";
import { returnRate as calcReturns } from "./calc";
export function ReturnRateCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [unitsSold, setUnitsSold] = useState<number | "">("")
    const [unitsReturned, setUnitsReturned] = useState<number | "">("")
    // New Financial Inputs
    const [sellingPrice, setSellingPrice] = useState<number | "">("")
    const [returnCost, setReturnCost] = useState<number | "">("")
    const [resoldPercent, setResoldPercent] = useState<number | "">("")
    const n = (v: number | "") => (v === "" ? null : v);
    const result = calcReturns({
        unitsSold: n(unitsSold),
        unitsReturned: n(unitsReturned),
        sellingPrice: n(sellingPrice),
        costPerReturn: n(returnCost),
        resoldPercent: n(resoldPercent),
    });
    const hasResult = result.ok;
    const sold = unitsSold === "" ? 0 : unitsSold;
    const returned = unitsReturned === "" ? 0 : unitsReturned;
    const returnRate = result.ok ? result.returnRate : 0;
    const lostRevenue = result.ok ? result.refunded : 0;
    const totalReturnCost = result.ok ? result.handlingCost : 0;
    const recovered = result.ok ? result.recovered : 0;
    const profitLeakage = result.ok ? result.profitLeakage : 0;
    const handleReset = () => {
        setUnitsSold("");
        setUnitsReturned("");
        setSellingPrice("");
        setReturnCost("");
        setResoldPercent("");
    };
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2
        }).format(val);
    };
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter sales, returns, and item values."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Volume Data */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                                        <Package className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-sm font-black text-slate-600 tracking-widest dark:text-slate-300">Volume Data</h2>
                                </div>
                                <CalculatorInput
                                    label="Total Units Sold"
                                    value={unitsSold}
                                    onChange={setUnitsSold}
                                    placeholder="1000"
                                    tooltip="Total items shipped in the period."
                                />
                                <CalculatorInput
                                    label="Total Units Returned"
                                    value={unitsReturned}
                                    onChange={setUnitsReturned}
                                    placeholder="50"
                                    tooltip="Total items sent back by customers. Can't be more than units sold."
                                    hint={!result.ok && result.reason === "returns-above-sales" ? "Units returned can't be more than units sold in the same period." : undefined}
                                />
                            </div>
                            {/* Group 2: Financial Impact */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 dark:bg-red-950/40 dark:text-red-200">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-sm font-black text-slate-600 tracking-widest dark:text-slate-300">Financial Impact</h2>
                                </div>
                                <CalculatorInput
                                    label="Avg. Selling Price"
                                    value={sellingPrice}
                                    onChange={setSellingPrice}
                                    currency={currency}
                                    step={0.01}
                                    placeholder="25.00"
                                    isOptional
                                    tooltip="The average price refunded per return."
                                />
                                <CalculatorInput
                                    label="Est. Cost per Return"
                                    value={returnCost}
                                    onChange={setReturnCost}
                                    currency={currency}
                                    step={0.01}
                                    placeholder="5.00"
                                    isOptional
                                    tooltip="Shipping labels, restocking fees, and processing costs per item."
                                />
                                <CalculatorInput
                                    label="Returns Resold"
                                    value={resoldPercent}
                                    onChange={setResoldPercent}
                                    max={100}
                                    suffix="%"
                                    placeholder="0"
                                    isOptional
                                    tooltip="The share of returned units you restock and sell again at full price. Their refund comes back when they sell, so it is left out of profit leakage."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    {/* Logic Highlight */}
                    <FadeIn delay={0.2}>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4 dark:bg-slate-800/60 dark:border-slate-800">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-red-600 shrink-0 shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-red-200">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-800 mb-1 leading-tight dark:text-slate-100">Profit Leakage Alert</h2>
                                <p className={cn(
                                    "text-base leading-relaxed max-w-lg transition-colors duration-300 font-medium",
                                    returned > 0 ? "text-slate-600 dark:text-slate-300" : "text-slate-600 dark:text-slate-300"
                                )}>
                                    {hasResult ? (
                                        <>Returns are more than lost sales. With the handling costs, these {returned} returns have taken <span className="font-bold text-red-700 dark:text-red-300">{formatCurrency(profitLeakage)}</span> from your bottom line this period, after the refunds on resold items.</>
                                    ) : (
                                        <>Enter units sold and returned to see what returns cost you this period.</>
                                    )}
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Return Rate"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                {hasResult ? (
                                    <>
                                        <Counter
                                            value={returnRate}
                                            formatter={(val) => val.toFixed(2)}
                                            className="text-5xl font-bold"
                                        />
                                        <span className="text-3xl font-bold text-slate-600 dark:text-slate-300">%</span>
                                    </>
                                ) : (
                                    <span className="text-5xl font-bold">–</span>
                                )}
                            </div>
                        }
                        secondaryMetrics={[
                            { label: "Revenue Refunded", value: formatCurrency(lostRevenue), color: "text-red-200" },
                            { label: "Processing Costs", value: formatCurrency(totalReturnCost), color: "text-orange-400" }
                        ]}
                    />
                    {/* Breakdown Card */}
                    {hasResult && (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-red-500 dark:bg-slate-900 dark:border-slate-800">
                            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
                                <p className="text-xs font-bold text-slate-600 tracking-wider dark:text-slate-300">Financial Impact Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Revenue Refunded</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(lostRevenue)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Recovered by Reselling</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">−{formatCurrency(recovered)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Processing Costs</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(totalReturnCost)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5 bg-red-50/20 dark:bg-red-950/40">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Total Profit Leakage</span>
                                    <span className="text-base font-bold text-red-700 dark:text-red-300">{formatCurrency(profitLeakage)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Insight Card */}
                    <Card className="border border-slate-200 shadow-sm p-6 space-y-3 bg-white dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 dark:text-white">
                                <RotateCcw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Return Health
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <InsightItem
                                label="Total Profit Leakage"
                                value={formatCurrency(profitLeakage)}
                                description="Refunds not recovered by reselling, plus handling costs."
                                icon={DollarSign}
                                color="text-red-700 dark:text-red-300"
                                bg="bg-red-50 dark:bg-red-950/40"
                            />
                            <InsightItem
                                label="Units Returned"
                                value={hasResult ? returned.toString() : "–"}
                                description={hasResult ? `Out of ${sold} units sold.` : "Enter units sold and returned."}
                                icon={Package}
                                color="text-slate-600 dark:text-slate-300"
                                bg="bg-slate-50 dark:bg-slate-800/60"
                            />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-300">
                            Return rates differ by category, so compare with your own past periods and your category rather than one target.
                        </p>
                    </Card>
                </div>
            </div>
        </FadeIn>
    );
}
function InsightItem({ label, value, description, icon: Icon, color, bg }: { label: string, value: string, description: string, icon: any, color: string, bg: string }) {
    return (
        <div className="flex gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="flex items-baseline gap-2 mb-1">
                    <h2 className="text-sm font-bold text-slate-900 leading-tight dark:text-white">{label}</h2>
                    <span className={cn("text-sm font-bold", color)}>{value}</span>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed dark:text-slate-300">{description}</p>
            </div>
        </div>
    )
}

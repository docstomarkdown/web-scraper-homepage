"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { PieChart, Info, Settings2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EtsyFeeBreakdownProps {
    isDetailed: boolean
    netProfit: number
    listingFee: number
    transFee: number
    payFee: number
    adFee: number
    productCost: number
    shippingCost: number
    totalRevenue: number
    currency: string
    className?: string
}

export function EtsyFeeBreakdown({
    isDetailed,
    netProfit,
    listingFee,
    transFee,
    payFee,
    adFee,
    productCost,
    shippingCost,
    totalRevenue,
    currency,
    className
}: EtsyFeeBreakdownProps) {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(val)
    }

    const isProfitable = netProfit > 0
    const totalFees = listingFee + transFee + payFee + adFee
    const pieTotal = isProfitable ? totalRevenue : (totalFees + productCost + shippingCost)
    const calcPct = (val: number) => pieTotal > 0 ? (val / pieTotal) * 100 : 0

    // Dynamic Slices calculation
    const rawData = isDetailed 
        ? [
            { name: netProfit >= 0 ? "Net Profit" : "Net Loss", value: netProfit, color: "#10b981", isCost: false },
            { name: "Transaction Fee", value: transFee, color: "#f97316", isCost: true },
            { name: "Payment Processing", value: payFee, color: "#3b82f6", isCost: true },
            { name: "Listing Fee", value: listingFee, color: "#6366f1", isCost: true },
            { name: "Offsite Ads", value: adFee, color: "#a855f7", isCost: true },
            { name: "Item Cost", value: productCost, color: "#f59e0b", isCost: true },
            { name: "Shipping Cost", value: shippingCost, color: "#ec4899", isCost: true },
        ]
        : [
            { name: netProfit >= 0 ? "Net Profit" : "Net Loss", value: netProfit, color: "#10b981", isCost: false },
            { name: "Etsy Fees", value: totalFees, color: "#f97316", isCost: true },
            { name: "Item Cost", value: productCost, color: "#f59e0b", isCost: true },
            { name: "Shipping Cost", value: shippingCost, color: "#ec4899", isCost: true },
        ]

    const pieData = rawData.filter(i => i.value > 0)

    const legendItems = rawData.map(item => ({
        label: item.name,
        value: item.value,
        pct: item.value > 0 ? calcPct(item.value) : 0,
        colorBg: item.color,
        isCost: item.isCost
    }))

    return (
        <Card className={cn("border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-[#F5F8FD] dark:bg-slate-900 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 sm:gap-5 dark:border-slate-800", className)}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10 dark:bg-blue-950/40 dark:ring-slate-900">
                        <PieChart className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-base font-semibold text-slate-600 leading-none dark:text-slate-300">
                        Revenue Breakdown
                    </h2>
                </div>

                {/* Transparency Badge */}
                <TooltipProvider delayDuration={200}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn(
                                "px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-help transition-all",
                                isDetailed 
                                    ? "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-900/50" 
                                    : "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-900/50"
                            )}>
                                {isDetailed ? (
                                    <>
                                        <Sparkles className="w-2.5 h-2.5" />
                                        <span>Exact Breakdown</span>
                                    </>
                                ) : (
                                    <>
                                        <Settings2 className="w-2.5 h-2.5" />
                                        <span>Etsy Default Rates</span>
                                    </>
                                )}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-slate-900 text-white text-xs max-w-[240px] dark:bg-slate-800">
                            {isDetailed 
                                ? "Current visualization accounts for your custom fee configuration." 
                                : "Currently showing standard Etsy fee estimates. Open the Fees panel on the left to customize these values for higher accuracy."
                            }
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="flex flex-row items-center gap-3 sm:gap-5 w-full min-h-[140px]">
                {/* Left: Chart */}
                <div className="h-[120px] w-[120px] sm:h-[135px] sm:w-[135px] relative shrink-0">
                    {pieTotal > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={60}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                    animationBegin={0}
                                    animationDuration={500}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </RechartsPie>
                        </ResponsiveContainer>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-center p-3 text-slate-600 dark:text-slate-300 text-xs leading-tight font-medium border-2 border-dashed border-slate-200/70 rounded-full bg-slate-50/40 dark:border-slate-800 dark:bg-slate-800/60">
                            Add data to see breakdown
                        </div>
                    )}
                    {/* Center Label */}
                    {pieTotal > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xs sm:text-xs font-medium text-slate-400 text-center leading-tight mb-0.5 dark:text-slate-500">
                                {isProfitable ? "Total Revenue" : "Total Costs"}
                            </span>
                            <span className="text-xs sm:text-xs font-bold text-slate-900 tracking-tight dark:text-white">
                                {formatCurrency(pieTotal)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Right: Legend */}
                <div className="flex-1 min-w-0 flex flex-col gap-1.5 relative py-1">
                    {legendItems.map((item) => {
                        const isNetItem = !item.isCost
                        const isPositive = item.value >= 0
                        const derivedDotColor = (isNetItem && !isPositive) ? "#e11d48" : item.colorBg

                        return (
                            <div
                                key={item.label}
                                className="grid text-xs px-3 bg-white border border-slate-100 rounded-lg py-1.5 shadow-sm dark:bg-slate-900 dark:border-slate-800"
                                style={{ gridTemplateColumns: "1fr auto auto" }}
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: derivedDotColor }} />
                                    <span className="text-slate-600 font-bold truncate dark:text-slate-300">{item.label}</span>
                                </div>
                                <span className={cn(
                                    "font-semibold tabular-nums text-right px-2 self-center",
                                    item.isCost ? "text-slate-500 dark:text-slate-400" : (!isPositive ? "text-rose-600 dark:text-rose-400" : "text-emerald-700 dark:text-emerald-300")
                                )}>
                                    {!item.isCost && item.value > 0 ? "+" : ""}{formatCurrency(item.value)}
                                </span>
                                <span className={cn(
                                    "font-extrabold tabular-nums text-right self-center w-[36px]",
                                    item.isCost ? "text-slate-900 dark:text-white" : (!isPositive ? "text-rose-700 dark:text-rose-400" : "text-emerald-700 dark:text-emerald-400")
                                )}>
                                    {item.pct.toFixed(0)}%
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Card>
    )
}

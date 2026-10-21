"use client"
import { BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface GrossMarginRevenueBreakdownProps {
    derivedRevenue: number
    derivedCogs: number
    derivedProfit: number
}

export function GrossMarginRevenueBreakdown({
    derivedRevenue,
    derivedCogs,
    derivedProfit,
}: GrossMarginRevenueBreakdownProps) {
    const cogsPercent = derivedRevenue > 0 ? Math.min(Math.max((derivedCogs / derivedRevenue) * 100, 0), 100) : 0
    const profitPercent = derivedRevenue > 0 ? Math.min(Math.max((derivedProfit / derivedRevenue) * 100, 0), 100) : 0

    return (
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden p-5 dark:bg-slate-900 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2 dark:text-slate-200">
                <BarChart3 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                Revenue Breakdown
            </h4>
            <div className="space-y-3">
                {/* Stacked Bar */}
                <div className="relative w-full h-8 bg-slate-100 rounded-full overflow-hidden flex dark:bg-slate-800">
                    <div
                        style={{ width: `${cogsPercent}%` }}
                        className="h-full bg-slate-400 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
                    >
                        {cogsPercent > 12 && "COGS"}
                    </div>
                    <div
                        style={{ width: `${profitPercent}%` }}
                        className="h-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
                    >
                        {profitPercent > 12 && "PROFIT"}
                    </div>
                </div>
                {/* Legend */}
                <div className="flex items-center justify-start gap-6 text-xs text-slate-500 font-medium px-1 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                            COGS:{" "}
                            <span className="font-bold text-slate-600 dark:text-slate-300">
                                {cogsPercent.toFixed(1)}%
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span>
                            Profit:{" "}
                            <span className="font-bold text-slate-600 dark:text-slate-300">
                                {profitPercent.toFixed(1)}%
                            </span>
                        </span>
                    </div>
                    {derivedRevenue <= 0 && (
                        <span className="text-slate-400 italic dark:text-slate-500">Enter values to see breakdown</span>
                    )}
                </div>
            </div>
        </Card>
    )
}

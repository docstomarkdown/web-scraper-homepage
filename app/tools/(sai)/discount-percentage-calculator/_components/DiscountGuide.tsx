"use client"
import { BookOpen, CircleDollarSign, Percent, Calculator, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToolSectionHeader } from "@/app/tools/_shared/components"
const insights = [
    {
        icon: CircleDollarSign,
        iconBg: "bg-blue-50 dark:bg-blue-950/40",
        iconColor: "text-blue-500 dark:text-blue-400",
        statColor: "text-blue-600 dark:text-blue-400",
        title: "Original Price",
        stat: "Start",
        statLabel: "The starting price before discount",
        description: "The initial listed price of the item or service before any reductions are applied. This is often referred to as the 'Sticker Price' or 'MSRP'.",
        tooltip: "The price you see on the tag before any deals or coupons."
    },
    {
        icon: Percent,
        iconBg: "bg-blue-50 dark:bg-blue-950/40",
        iconColor: "text-blue-500 dark:text-blue-400",
        statColor: "text-blue-600 dark:text-blue-400",
        title: "Discount Percentage",
        stat: "Off %",
        statLabel: "The rate of reduction",
        description: "The percentage by which the original price is reduced. A 20% discount means you pay 80% of the original price.",
        tooltip: "How much percent is being taken off the original price."
    },
    {
        icon: Calculator,
        iconBg: "bg-amber-50 dark:bg-amber-950/40",
        iconColor: "text-amber-500 dark:text-amber-400",
        statColor: "text-amber-600 dark:text-amber-400",
        title: "You Save",
        stat: "Saved",
        statLabel: "Money kept in your pocket",
        description: "The actual amount of money deducted from the original price. This is calculated as: Original Price × (Discount % / 100).",
        tooltip: "The total dollar amount you are not paying."
    },
    {
        icon: Info,
        iconBg: "bg-violet-50 dark:bg-violet-950/40",
        iconColor: "text-violet-500 dark:text-violet-400",
        statColor: "text-violet-600 dark:text-violet-400",
        title: "Final Price",
        stat: "Pay",
        statLabel: "The amount you actually pay",
        description: "The final amount you need to pay after the discount is applied. Calculated as: Original Price - You Save.",
        tooltip: "The bottom line price after all discounts."
    }
]
export function DiscountGuide() {
    return (
        <section id="discount-guide">
            <ToolSectionHeader icon={BookOpen} title="Understanding Discounts" />
            <div className="space-y-6">
                {insights.map((insight, index) => {
                    const Icon = insight.icon
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden dark:bg-slate-900 dark:border-slate-800"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Left: Content */}
                                <div className="flex-1 p-6 order-2 md:order-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-9 h-9 rounded-xl ${insight.iconBg} ${insight.iconColor} flex items-center justify-center border border-slate-100/50 dark:border-slate-800`}>
                                            <Icon className="w-4.5 h-4.5" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-slate-900 dark:text-white">{insight.title}</h3>
                                            {'tooltip' in insight && (
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors dark:text-slate-500 dark:hover:text-blue-400">
                                                                <Info className="h-3.5 w-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800 dark:bg-slate-800 dark:border-slate-700">
                                                            {insight.tooltip}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-300">
                                        {insight.description}
                                    </p>
                                </div>
                                {/* Right: Takeaway Stat Panel (Neutral Background) */}
                                <div className="flex md:flex-col items-center justify-center gap-1.5 p-6 md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2 dark:bg-slate-800/60 dark:border-slate-800">
                                    <div className={`text-3xl font-bold ${insight.statColor} tracking-tight`}>{insight.stat}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100/50 px-2 py-0.5 rounded-full dark:text-slate-500 dark:bg-slate-800">
                                        Takeaway
                                    </div>
                                    <div className="text-[11px] font-medium text-slate-500 text-center leading-tight mt-1 max-w-[120px] dark:text-slate-400">
                                        {insight.statLabel}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

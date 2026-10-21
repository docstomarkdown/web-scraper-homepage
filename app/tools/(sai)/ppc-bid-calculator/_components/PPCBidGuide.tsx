"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BarChart3, BookOpen, Calculator, Target, TrendingUp } from "lucide-react"

export function PPCBidGuide() {
    return (
        <ToolGuide
            title="How the bids are calculated"
            icon={BookOpen}
            items={[
                {
                    title: "The formulas",
                    description: "Break-even bid = price × conversion rate × profit margin. Recommended bid = price × conversion rate × target ACoS. With no target, ACoS is set to 75% of the margin.",
                    icon: Calculator,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "What ACoS means",
                    description: "ACoS is ad spend divided by the sales those ads produce. A 20% ACoS means $20 of ads for every $100 of sales. If your ACoS is above your margin, the ads lose money.",
                    icon: Target,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Where the inputs come from",
                    description: "Price is your listing price. Conversion rate is orders ÷ clicks from your ad reports. Margin is profit before ads as a share of price.",
                    icon: BarChart3,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "A $50 product converting at 10% with a 30% margin has a break-even bid of $1.50. With a 20% target ACoS the recommended bid is $1.00; with no target it is $1.13.",
                    icon: TrendingUp,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}

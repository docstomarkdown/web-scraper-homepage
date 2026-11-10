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
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "What ACoS means",
                    description: "ACoS is ad spend divided by the sales those ads produce. A 20% ACoS means $20 of ads for every $100 of sales. If your ACoS is above your margin, the ads lose money.",
                    icon: Target,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Where the inputs come from",
                    description: "Price is your listing price. Conversion rate is orders ÷ clicks from your ad reports. Margin is profit before ads as a share of price.",
                    icon: BarChart3,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "A $50 product converting at 10% with a 30% margin has a break-even bid of $1.50. With a 20% target ACoS the recommended bid is $1.00; with no target it is $1.13.",
                    icon: TrendingUp,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}

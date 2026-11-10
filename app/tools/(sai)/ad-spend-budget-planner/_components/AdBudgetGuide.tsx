"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Wallet, Calculator, MousePointerClick, ShoppingCart, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function AdBudgetGuide() {
    return (
        <ToolGuide
            title="How the budget is worked out"
            icon={Wallet}
            items={[
                { title: "The formula in words", description: "Required ad spend equals the revenue goal divided by the target ROAS. Daily spend is that figure divided by 30. Estimated clicks equal the spend divided by the average cost per click, and estimated orders equal the clicks times the conversion rate.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Where the inputs come from", description: "Revenue goal and target ROAS are your decisions. Average cost per click and conversion rate come from the ad console: use the campaign type you'll run, because search, shopping and social ads convert differently.", icon: MousePointerClick, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "Goal $20,000 a month at a target ROAS of 4 means a $5,000 budget, about $167 a day. At $1.25 per click that buys 4,000 clicks; at a 2.5% conversion rate those clicks become 100 orders, each worth $200 on average to reach the goal.", icon: ShoppingCart, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Check the orders against your average order value", description: "Divide the revenue goal by the estimated orders. If that's far above what customers spend per order today, the plan needs a higher conversion rate, a lower CPC or a bigger budget, not hope.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}

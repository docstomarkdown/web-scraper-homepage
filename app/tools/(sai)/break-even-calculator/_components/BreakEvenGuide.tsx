"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Scale, Calculator, Percent, TrendingUp, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function BreakEvenGuide() {
    return (
        <ToolGuide
            title="How break-even is worked out"
            icon={Scale}
            items={[
                { title: "The formula in words", description: "Contribution margin per unit equals the price minus the variable cost per unit. Break-even units equal fixed costs divided by the contribution margin, rounded up to a whole unit. Break-even revenue equals those units times the price.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "Fixed costs $10,000, price $50, variable cost $30. The contribution margin is $20, so you break even at 500 units, which is $25,000 of revenue. The 501st unit is the first $20 of profit.", icon: Percent, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What moves the number", description: "Raising the price or cutting the variable cost widens the margin and lowers the units; cutting fixed costs lowers them directly. A $5 price rise in the example cuts break-even from 500 to 400 units.", icon: TrendingUp, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't do", description: "It assumes one price and one variable cost for every unit. If you sell several products or give volume discounts, run it per product or use a weighted average, and treat the result as a planning figure.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}

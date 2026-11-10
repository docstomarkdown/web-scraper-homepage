"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Users, Calculator, Percent, Scale, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function CLVGuide() {
    return (
        <ToolGuide
            title="How lifetime value is worked out"
            icon={Users}
            items={[
                { title: "The formula in words", description: "Lifetime revenue equals average order value times purchases per year times years as a customer. Lifetime profit equals lifetime revenue times the gross margin, before acquisition cost; subtract the acquisition cost for profit after it. The LTV to CAC ratio equals lifetime profit divided by the customer acquisition cost.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "A $60 average order, four orders a year and a three-year lifespan give $720 of lifetime revenue. At a 40% margin that's $288 of lifetime profit, and $228 after a $60 acquisition cost. The LTV to CAC ratio is $288 ÷ $60 = 4.8 to 1, above the common three to one rule of thumb.", icon: Percent, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Where the inputs come from", description: "Order value and frequency come from your sales report: revenue divided by orders, and orders divided by customers over a year. Lifespan is harder; estimate it from how long your repeat customers have been active, and start with one to three years if you don't know.", icon: Scale, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't do", description: "It assumes customers keep buying at the same rate for the whole lifespan and ignores discounting, so it overstates the value of long lifespans. Use it to compare segments and channels, and be conservative with the lifespan.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}

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
                { title: "The formula in words", description: "Lifetime revenue equals average order value times purchases per year times years as a customer. Lifetime profit equals lifetime revenue times the gross margin. The LTV to CAC ratio equals lifetime profit divided by the customer acquisition cost.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "A $60 average order, four orders a year and a three-year lifespan give $720 of lifetime revenue. At a 40% margin that's $288 of lifetime profit. With a $60 acquisition cost the ratio is 4.8 to 1, comfortably above the three to one benchmark.", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Where the inputs come from", description: "Order value and frequency come from your sales report: revenue divided by orders, and orders divided by customers over a year. Lifespan is harder; estimate it from how long your repeat customers have been active, and start with one to three years if you don't know.", icon: Scale, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't do", description: "It assumes customers keep buying at the same rate for the whole lifespan and ignores discounting, so it overstates the value of long lifespans. Use it to compare segments and channels, and be conservative with the lifespan.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}

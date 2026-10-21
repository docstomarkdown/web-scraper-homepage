"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { ShoppingCart, Calculator, BarChart2, Truck, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function AbandonmentGuide() {
    return (
        <ToolGuide
            title="What the rate tells you"
            icon={ShoppingCart}
            items={[
                { title: "The formula in words", description: "Abandonment rate equals one minus completed transactions divided by carts created, times 100. It's the share of started carts that didn't finish.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "500 carts and 150 completed orders: 150 ÷ 500 is 0.30, so the abandonment rate is 70%. Winning back one in ten of the lost carts would add 35 orders a period.", icon: BarChart2, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Why carts are abandoned", description: "Surveys of shoppers put unexpected costs first (shipping, taxes and fees shown late), then forced account creation, a long checkout, no trusted payment method and slow delivery. Showing the full cost early fixes the biggest one.", icon: Truck, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't tell you", description: "The rate counts people who were only comparing or saving items too, so it never reaches zero. Watch the trend and the drop-off per checkout step rather than chasing a single target.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}

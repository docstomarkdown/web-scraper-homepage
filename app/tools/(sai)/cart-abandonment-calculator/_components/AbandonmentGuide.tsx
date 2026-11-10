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
                { title: "The formula in words", description: "Abandonment rate equals one minus completed transactions divided by carts created, times 100. It's the share of started carts that didn't finish.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "500 carts and 150 completed orders: 150 ÷ 500 is 0.30, so the abandonment rate is 70%. Winning back one in ten of the lost carts would add 35 orders a period.", icon: BarChart2, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Why carts are abandoned", description: "Surveys of shoppers put unexpected costs first (shipping, taxes and fees shown late), then forced account creation, a long checkout, no trusted payment method and slow delivery. Showing the full cost early fixes the biggest one.", icon: Truck, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't tell you", description: "The rate counts people who were only comparing or saving items too, so it never reaches zero. Watch the trend and the drop-off per checkout step rather than chasing a single target.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}

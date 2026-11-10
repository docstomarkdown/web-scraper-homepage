"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Truck, Calculator, Percent, Target, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function FreeShippingGuide() {
    return (
        <ToolGuide
            title="How the check is worked out"
            icon={Truck}
            items={[
                { title: "The formula in words", description: "Profit per order today equals the average order value times the gross margin, with the customer paying shipping. A free-shipping order is worth the higher of the average order and the threshold, since customers below the threshold add items to reach it. Its profit is that value times the margin, minus the shipping cost. Required sales increase equals profit today divided by profit per free-shipping order, minus one, as a percentage.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "A $60 average order at a 40% margin makes $24 of profit today. With a $65 threshold, a free-shipping order makes 65 × 40% = $26, and absorbing $7 of shipping leaves $19. To earn the same total profit you'd need 24 ÷ 19 − 1 = 26.3% more orders. At a $60 threshold it would be 24 ÷ 17 − 1 = 41.2%.", icon: Percent, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Setting the threshold", description: "Put the threshold a little above the current average order, $65 or $70 for a $60 average, so customers add an item to qualify. The calculator assumes orders rise to the threshold, so treat its answer as the best case: some orders will stay below the line and pay shipping.", icon: Target, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "When it doesn't work", description: "If the shipping cost is more than the gross profit per order, every free-shipping order loses money and no sales increase fixes it. The calculator says so; raise the threshold or the prices, or keep charging for shipping on heavy items.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}

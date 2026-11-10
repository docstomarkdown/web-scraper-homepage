"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Percent, Scale, Tag } from "lucide-react"

export function WholesalePriceGuide() {
    return (
        <ToolGuide
            title="How the wholesale price is calculated"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "Effective cost = cost per unit × (1 + tax rate). Wholesale price = effective cost ÷ (1 − margin). Profit per unit = price − effective cost.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Margin and markup",
                    description: "Margin is profit ÷ price; markup is profit ÷ cost. A 40% margin is a 66.7% markup. Retailers usually talk in margin, suppliers in markup.",
                    icon: Percent,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Typical wholesale margins",
                    description: "30% to 50% is common, leaving the retailer room to roughly double the wholesale price. If your price lands above what the market pays, the cost side has to move.",
                    icon: Scale,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "A $10 cost with no tax and a 40% margin: wholesale price $16.67, profit per unit $6.67, markup 66.7%. With 5% duty, the effective cost is $10.50 and the price $17.50.",
                    icon: Tag,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}

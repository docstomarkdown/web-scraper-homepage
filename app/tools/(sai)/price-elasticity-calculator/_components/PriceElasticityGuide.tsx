"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, LineChart, ShieldCheck, TrendingUp } from "lucide-react"

export function PriceElasticityGuide() {
    return (
        <ToolGuide
            title="How to read the elasticity number"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "Elasticity = percentage change in quantity ÷ percentage change in price, both measured from the starting values. A negative sign is normal: price up, sales down.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Elastic demand (above 1)",
                    description: "Buyers react strongly to price. A cut brings in more revenue because the extra units outweigh the lower price. Common for products with many substitutes.",
                    icon: TrendingUp,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Inelastic demand (below 1)",
                    description: "Buyers barely change their buying when the price moves. A rise brings in more revenue. Common for necessities, consumables and products with no close alternative.",
                    icon: ShieldCheck,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "Price falls from $50 to $45 (−10%) and sales rise from 1,000 to 1,200 (+20%). Elasticity is 20 ÷ −10 = −2.0, so demand is elastic and the cut raised revenue from $50,000 to $54,000.",
                    icon: LineChart,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}

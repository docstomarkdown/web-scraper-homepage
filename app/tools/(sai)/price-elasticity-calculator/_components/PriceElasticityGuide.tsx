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
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Elastic demand (above 1)",
                    description: "Buyers react strongly to price. A cut brings in more revenue because the extra units outweigh the lower price. Common for products with many substitutes.",
                    icon: TrendingUp,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Inelastic demand (below 1)",
                    description: "Buyers barely change their buying when the price moves. A rise brings in more revenue. Common for necessities, consumables and products with no close alternative.",
                    icon: ShieldCheck,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "Price falls from $50 to $45 (−10%) and sales rise from 1,000 to 1,200 (+20%). Elasticity is 20 ÷ −10 = −2.0, so demand is elastic and the cut raised revenue from $50,000 to $54,000.",
                    icon: LineChart,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}

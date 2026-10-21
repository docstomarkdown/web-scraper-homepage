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
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Margin and markup",
                    description: "Margin is profit ÷ price; markup is profit ÷ cost. A 40% margin is a 66.7% markup. Retailers usually talk in margin, suppliers in markup.",
                    icon: Percent,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Typical wholesale margins",
                    description: "30% to 50% is common, leaving the retailer room to roughly double the wholesale price. If your price lands above what the market pays, the cost side has to move.",
                    icon: Scale,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "A $10 cost with no tax and a 40% margin: wholesale price $16.67, profit per unit $6.67, markup 66.7%. With 5% duty, the effective cost is $10.50 and the price $17.50.",
                    icon: Tag,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}

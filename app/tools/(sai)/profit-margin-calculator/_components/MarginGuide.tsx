"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, CircleDollarSign, Info, Percent } from "lucide-react"

export function MarginGuide() {
    return (
        <ToolGuide
            title="Margin, markup and profit"
            icon={BookOpen}
            items={[
                {
                    title: "Gross margin",
                    description: "Margin = (price − cost) ÷ price. It is the share of each sale you keep after the cost of the item. A higher margin leaves more for overheads and profit.",
                    icon: CircleDollarSign,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Markup",
                    description: "Markup = (price − cost) ÷ cost. It is the share you add to the cost to reach the price. A 100% markup doubles the cost.",
                    icon: Percent,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Profit per unit",
                    description: "Price − cost, in money. It is the figure to multiply by units sold to see what a product earns.",
                    icon: Calculator,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "You buy for $50 and sell for $100. Profit per unit is $50, markup is 100%, and margin is 50%. The same $50 is a different percentage depending on whether you divide by cost or by price.",
                    icon: Info,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}

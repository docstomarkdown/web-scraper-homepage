"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Coins, Scale, Timer } from "lucide-react"

export function MOQGuide() {
    return (
        <ToolGuide
            title="How to read the result"
            icon={BookOpen}
            items={[
                {
                    title: "Total investment",
                    description: "Total investment = cost per unit × MOQ + shipping + other costs. This is the cash you commit before the first sale.",
                    icon: Coins,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Landed cost per unit",
                    description: "Total investment ÷ MOQ. It is always higher than the supplier's unit price because the shipping and other costs are spread across the units.",
                    icon: Calculator,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
                {
                    title: "Months of inventory",
                    description: "MOQ ÷ monthly sales. Three to four months is comfortable for most sellers; more than six ties up cash and adds storage fees, fewer than two risks running out.",
                    icon: Timer,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "A worked example",
                    description: "500 units at $10 is $5,000. Add $400 shipping and $100 other costs: $5,500 in total, or $11.00 per unit. At 150 sales a month the order lasts about 3.3 months.",
                    icon: Scale,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
            ]}
        />
    )
}

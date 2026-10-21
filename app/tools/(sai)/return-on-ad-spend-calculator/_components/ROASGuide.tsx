"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Scale, Target, TrendingUp } from "lucide-react"

export function ROASGuide() {
    return (
        <ToolGuide
            title="How to read ROAS"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "ROAS = revenue from ads ÷ ad spend. A ROAS of 4.0 means $4 of sales for every $1 of ads, or 400%.",
                    icon: Calculator,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "ROAS is not profit",
                    description: "ROAS ignores product cost, fees and shipping. A ROAS of 2.0 on a product with a 40% margin loses money: $2 of sales earns $0.80, and the click cost $1.",
                    icon: Scale,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "The break-even ROAS",
                    description: "Break-even ROAS = 1 ÷ profit margin. With a 40% margin you need a ROAS of 2.5 before the ads make anything. Set your target above it.",
                    icon: Target,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "$100 of ads produced $500 of sales: ROAS 5.0, or 500%, and $400 of revenue above the ad cost. In Revenue goal mode, $100 at a target of 4.0 needs $400 of sales.",
                    icon: TrendingUp,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}

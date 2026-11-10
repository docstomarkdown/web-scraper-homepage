"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, CircleDollarSign, TrendingUp } from "lucide-react"

export function MarginHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Choose what to find",
                    description: "Find margin from a price and a cost, find the price for a target margin, or find the most the goods can cost. Then type the two numbers you know.",
                    icon: CircleDollarSign,
                },
                {
                    title: "Add shipping, fees and tax if you want net margin",
                    description: "Under advanced settings, add the shipping and fees you pay per unit, and the tax rate if your price includes tax. They count only while the panel is open.",
                    icon: Calculator,
                },
                {
                    title: "Read margin, markup and profit",
                    description: "The calculator shows gross margin as a share of the price, markup as a share of the cost, and the profit per unit, or the price or cost that hits your target.",
                    icon: TrendingUp,
                },
            ]}
        />
    )
}

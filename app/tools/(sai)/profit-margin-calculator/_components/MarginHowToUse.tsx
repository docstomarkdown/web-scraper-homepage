"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, CircleDollarSign, TrendingUp } from "lucide-react"

export function MarginHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the selling price",
                    description: "Type the price the customer pays for one unit.",
                    icon: CircleDollarSign,
                },
                {
                    title: "Enter the cost",
                    description: "Type what one unit costs you: the product plus shipping, packaging and any fees you pay to sell it.",
                    icon: Calculator,
                },
                {
                    title: "Read margin, markup and profit",
                    description: "The calculator shows gross margin as a share of the price, markup as a share of the cost, and the profit per unit.",
                    icon: TrendingUp,
                },
            ]}
        />
    )
}

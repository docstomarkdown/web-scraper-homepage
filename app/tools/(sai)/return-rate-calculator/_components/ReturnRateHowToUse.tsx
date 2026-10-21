"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { BarChart3, CircleDollarSign, Package } from "lucide-react"

export function ReturnRateHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter units sold and returned",
                    description: "Type how many units you sold in the period and how many came back.",
                    icon: Package,
                },
                {
                    title: "Add the price and the cost of a return",
                    description: "Enter the selling price, which is refunded, and what each return costs you in shipping, handling and repackaging.",
                    icon: CircleDollarSign,
                },
                {
                    title: "Read the rate and the money",
                    description: "The calculator shows the return rate, the revenue refunded, the return handling cost, and the two together as profit leakage.",
                    icon: BarChart3,
                },
            ]}
        />
    )
}

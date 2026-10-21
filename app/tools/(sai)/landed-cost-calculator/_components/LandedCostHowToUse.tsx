"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Ship, TrendingDown } from "lucide-react"

export function LandedCostHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the order",
                    description: "Type the supplier's cost per unit and the number of units in the shipment.",
                    icon: Package,
                },
                {
                    title: "Add what it costs to bring it in",
                    description: "Enter the shipping cost, your import duty rate, insurance, and any other fees such as brokerage or port handling.",
                    icon: Ship,
                },
                {
                    title: "Read the landed cost per unit",
                    description: "The calculator spreads every cost across the units and shows the price to use when you set your margins.",
                    icon: TrendingDown,
                },
            ]}
        />
    )
}

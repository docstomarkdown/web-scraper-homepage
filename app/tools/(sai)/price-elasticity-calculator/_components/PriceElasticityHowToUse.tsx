"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { LineChart, Tag, TrendingUp } from "lucide-react"

export function PriceElasticityHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the old price and sales",
                    description: "Type the price you charged before the change and the units you sold at it over a period.",
                    icon: Tag,
                },
                {
                    title: "Enter the new price and sales",
                    description: "Type the price after the change and the units sold over a period of the same length.",
                    icon: TrendingUp,
                },
                {
                    title: "Read the elasticity",
                    description: "The calculator shows the elasticity number and whether demand is elastic, inelastic or unitary, with what that means for revenue.",
                    icon: LineChart,
                },
            ]}
        />
    )
}

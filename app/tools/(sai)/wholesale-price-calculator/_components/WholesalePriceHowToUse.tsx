"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { CircleDollarSign, Percent, Tag } from "lucide-react"

export function WholesalePriceHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter your cost",
                    description: "Type the cost per unit and any tax or import duty rate that applies to it.",
                    icon: CircleDollarSign,
                },
                {
                    title: "Set the margin you need",
                    description: "Type the profit margin you want on each wholesale sale, as a percentage of the price.",
                    icon: Percent,
                },
                {
                    title: "Read the price",
                    description: "The calculator shows the wholesale price that gives that margin, the markup on cost, and the profit per unit.",
                    icon: Tag,
                },
            ]}
        />
    )
}

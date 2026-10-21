"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { BarChart3, Coins, TrendingUp } from "lucide-react"

export function TACoSHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter total revenue",
                    description: "Type all your sales for the period, including organic sales that didn't come from ads.",
                    icon: BarChart3,
                },
                {
                    title: "Enter ad spend and gross margin",
                    description: "Type what you spent on ads and your gross margin before ads, as a percentage.",
                    icon: Coins,
                },
                {
                    title: "Read TACoS and the margin after ads",
                    description: "The calculator shows TACoS and your net margin after ad spend, with a health meter against your margin.",
                    icon: TrendingUp,
                },
            ]}
        />
    )
}

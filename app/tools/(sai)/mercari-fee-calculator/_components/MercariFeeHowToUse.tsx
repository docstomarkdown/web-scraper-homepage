"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Tag, TrendingUp } from "lucide-react"

export function MercariFeeHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the sale price",
                    description: "Type the price you plan to list at. Every fee is worked out from this number.",
                    icon: Tag,
                },
                {
                    title: "Add your costs",
                    description: "Enter what you paid for the item, the shipping label if you pay it, and any packaging. Leave shipping blank when the buyer pays.",
                    icon: Package,
                },
                {
                    title: "Read your profit",
                    description: "The calculator takes off Mercari's two fees and your costs and shows net profit, margin, and the total for several identical items.",
                    icon: TrendingUp,
                },
            ]}
        />
    )
}

"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Target, TrendingUp } from "lucide-react"

export function PPCBidHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the product numbers",
                    description: "Type the selling price, the conversion rate of your listing, and the profit margin before ad spend.",
                    icon: Tag,
                },
                {
                    title: "Set a target ACoS if you have one",
                    description: "Enter the share of sales you are willing to spend on ads. Leave it blank and the calculator uses 75% of your margin.",
                    icon: Target,
                },
                {
                    title: "Read the two bids",
                    description: "The break-even bid is where a click earns nothing. The recommended bid keeps your target ACoS and leaves profit.",
                    icon: TrendingUp,
                },
            ]}
        />
    )
}

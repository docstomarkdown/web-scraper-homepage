"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Coins, Percent, Table } from "lucide-react"

export function GrossMarginHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Choose what you want to find", description: "Find Margin, Find Revenue or Find COGS. The two fields you need appear underneath.", icon: Percent },
                { title: "Type the two numbers you know", description: "Revenue is the selling price or the period's sales. Cost of goods sold is what those goods cost you. Target margin is the percentage you're aiming for.", icon: Coins },
                { title: "Read the result", description: "The missing number is the main result, with gross profit in money and a breakdown of where the revenue goes.", icon: Table },
            ]}
        />
    )
}

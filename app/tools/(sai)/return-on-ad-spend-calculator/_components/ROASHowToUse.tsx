"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { BarChart3, Coins, TrendingUp } from "lucide-react"

export function ROASHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the ad spend",
                    description: "Type what you spent on the campaign or the period.",
                    icon: Coins,
                },
                {
                    title: "Enter the revenue from those ads",
                    description: "Type the sales the ads produced, from your ad platform's attribution report. Or switch to Revenue goal and enter a target ROAS instead.",
                    icon: TrendingUp,
                },
                {
                    title: "Read the ROAS",
                    description: "The calculator shows ROAS as a multiple and a percentage, and the revenue above ad spend. Add your profit margin to see break-even ROAS, profit after product costs and whether the ads make money.",
                    icon: BarChart3,
                },
            ]}
        />
    )
}

"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Clock, Coins, TrendingUp } from "lucide-react"

export function ROIHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the amount invested",
                    description: "Type everything you put in: product cost, shipping, fees, ads and any tooling.",
                    icon: Coins,
                },
                {
                    title: "Enter the amount returned",
                    description: "Type the total you got back, usually the revenue the investment produced.",
                    icon: TrendingUp,
                },
                {
                    title: "Set the period",
                    description: "Pick dates or type a length so the calculator can show the annualised rate as well as the total ROI.",
                    icon: Clock,
                },
            ]}
        />
    )
}

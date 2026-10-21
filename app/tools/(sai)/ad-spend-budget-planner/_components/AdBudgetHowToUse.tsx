"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Target, TrendingUp, Wallet } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function AdBudgetHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter your Monthly Revenue Goal and Target ROAS", description: "The revenue goal is the sales you want the ads to bring in a month. Target ROAS is the return you need per unit of spend, for example 4 for $4 of sales per $1 of ads.", icon: Target },
                { title: "Add your Avg. Cost Per Click and Conversion Rate", description: "Take both from your ad console's last 30 days. They let the planner turn the budget into expected clicks and orders.", icon: TrendingUp },
                { title: "Read the monthly budget, daily spend, clicks and orders", description: "Monthly Ad Budget is the goal divided by the ROAS; daily spend is that over 30 days. Clicks are the budget divided by CPC, and orders are clicks times the conversion rate.", icon: Wallet }
            ]}
        />
    )
}

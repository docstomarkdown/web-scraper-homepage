"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ClipboardList, Clock, TrendingUp } from "lucide-react"

export function SalesVelocityHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the sales and the period",
                    description: "Type the units sold and the number of days in the period, for example 300 units in 30 days.",
                    icon: ClipboardList,
                },
                {
                    title: "Enter the days out of stock",
                    description: "Type how many of those days the product couldn't be bought. They are removed from the average.",
                    icon: Clock,
                },
                {
                    title: "Read the true velocity",
                    description: "The calculator shows raw and true units per day, the sales lost to the stockout, and the monthly run rate in units and revenue.",
                    icon: TrendingUp,
                },
            ]}
        />
    )
}

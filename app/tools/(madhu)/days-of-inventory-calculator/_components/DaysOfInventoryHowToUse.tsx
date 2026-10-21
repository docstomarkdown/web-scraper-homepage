"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Boxes, Table, TrendingUp, Warehouse } from "lucide-react"

export function DaysOfInventoryHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the stock you hold", description: "Total current stock is the sellable units in your warehouse or at your fulfilment provider today.", icon: Warehouse },
                { title: "Type your daily sales", description: "Use the average units sold a day over the last month or quarter. Switch the period if your report is weekly or monthly.", icon: TrendingUp },
                { title: "Add a safety buffer", description: "Safety buffer is the stock you never want to sell into. It's optional; leave it at 0 to see the plain runway.", icon: Boxes },
                { title: "Read the results", description: "Days of inventory remaining is the main number, with the usable days above the buffer beside it.", icon: Table },
            ]}
        />
    )
}

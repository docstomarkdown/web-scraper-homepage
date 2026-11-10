"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Clock, Coins, Table, Warehouse } from "lucide-react"

export function InventoryTurnoverHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the cost of goods sold", description: "The cost of the goods sold during the period, from your profit and loss, not the sales value.", icon: Coins },
                { title: "Type the opening and closing inventory", description: "The inventory value at the start and the end of the period, at cost. The calculator averages them.", icon: Warehouse },
                { title: "Set the period", description: "The days the cost of goods sold covers: 365 for a year, the quarter's or month's own days otherwise. The days figure uses it.", icon: Clock },
                { title: "Read the results", description: "The turnover ratio is the main number, with days sales of inventory and the turnover over a year beside it.", icon: Table },
                { title: "Check the days of stock left", description: "Switch to Days of stock left, type your units in stock, the units sold and the days they cover. Add a safety buffer and lead time to see when to order.", icon: Warehouse },
            ]}
        />
    )
}

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
                { title: "Set the period", description: "365 for a year, 90 for a quarter, 30 for a month. The days figure uses it.", icon: Clock },
                { title: "Read the results", description: "The turnover ratio is the main number, with days sales of inventory beside it.", icon: Table },
            ]}
        />
    )
}

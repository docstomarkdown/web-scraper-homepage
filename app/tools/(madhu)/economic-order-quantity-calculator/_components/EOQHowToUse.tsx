"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ClipboardList, Table, TrendingUp, Warehouse } from "lucide-react"

export function EOQHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the annual demand", description: "Annual demand is the units you expect to sell in a year. Use last year's figure adjusted for growth.", icon: TrendingUp },
                { title: "Type the cost per order", description: "Everything it costs to place one order: staff time, freight booking, customs paperwork, a minimum freight charge. Not the goods themselves.", icon: ClipboardList },
                { title: "Type the holding cost per unit", description: "What one unit costs to keep in stock for a year: storage, insurance, the money tied up, and shrinkage. Often 20% to 30% of the unit cost.", icon: Warehouse },
                { title: "Read the results", description: "The EOQ is the main number. Beside it are orders a year, days between orders, and the total annual cost at that order size.", icon: Table },
            ]}
        />
    )
}

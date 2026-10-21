"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Boxes, Coins, Ruler, Table } from "lucide-react"

export function CubicFeetHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Pick a unit and type the three sizes", description: "Choose inches, feet, centimetres or metres, then enter length, width and height. The result updates as you type.", icon: Ruler },
                { title: "Add a quantity", description: "For a batch of identical items, enter how many. The total volume is the single-item volume multiplied by the count.", icon: Boxes },
                { title: "Add a rate, if you want a cost", description: "Type your storage or freight provider's price per cubic foot and the calculator shows the estimated total.", icon: Coins },
                { title: "Read the results", description: "Cubic feet is the main number, with cubic metres and cubic inches beside it and the cost estimate when a rate is set.", icon: Table },
            ]}
        />
    )
}

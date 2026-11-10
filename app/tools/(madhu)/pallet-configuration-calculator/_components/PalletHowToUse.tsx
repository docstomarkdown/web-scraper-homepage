"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Layers, Ruler, Scale, Table } from "lucide-react"

export function PalletHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the carton size", description: "Length, width and height, in inches or centimetres. Measure the packed carton.", icon: Ruler },
                { title: "Pick the pallet and the stack height", description: "Choose a standard pallet (48 by 40 inches is the North American default) or enter your own. Max stack height is what the carrier or warehouse allows, pallet included.", icon: Layers },
                { title: "Add the carton weight, if you have a limit", description: "Enter the weight per carton, the pallet's weight limit and the empty pallet's weight. The total is cut back to stay under the limit.", icon: Scale },
                { title: "Read the results", description: "Total cartons is the main number, with cartons per layer, the number of layers, the load height and the share of the pallet's surface used.", icon: Table },
            ]}
        />
    )
}

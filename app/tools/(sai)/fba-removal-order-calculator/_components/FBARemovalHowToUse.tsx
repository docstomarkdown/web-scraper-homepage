"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Boxes, Receipt, Scale } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function FBARemovalHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the Number of Units", description: "How many units you want out of the warehouse, for example everything over six months old before the long-term storage surcharge.", icon: Boxes },
                { title: "Enter the Removal Fee and Disposal Fee per unit", description: "Both come from Amazon's removal order fee table and depend on the size tier and weight; they're the same per unit in the current US fee schedule. Then enter the Expected Selling Price you can get for a returned unit and Other Costs per unit to sell it, such as shipping and relisting.", icon: Receipt },
                { title: "Read the result", description: "Profit if removed is what you'd make selling the units elsewhere after the removal fee and costs. Loss if disposed is the disposal fee times the units. The calculator names the better option and the difference between them.", icon: Scale }
            ]}
        />
    )
}

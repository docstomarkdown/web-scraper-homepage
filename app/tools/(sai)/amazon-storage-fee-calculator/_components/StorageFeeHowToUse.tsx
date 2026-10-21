"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Ruler, Boxes, Calculator } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function StorageFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the box's Length, Width and Height", description: "Use the packaged dimensions in inches. The calculator turns them into cubic feet, which is what Amazon charges on.", icon: Ruler },
                { title: "Enter Units Stored and Storage Duration (Months)", description: "Units Stored is how many boxes sit in the warehouse at once. Months is how long they stay; after six months a long-term surcharge applies.", icon: Boxes },
                { title: "Read the monthly fee and the total", description: "The result shows the fee per month at the season's rate and the total over the period. Open the advanced options to force a season or a size tier instead of the automatic choice.", icon: Calculator }
            ]}
        />
    )
}

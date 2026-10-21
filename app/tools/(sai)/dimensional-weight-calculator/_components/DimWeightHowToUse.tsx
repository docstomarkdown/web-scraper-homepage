"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Ruler, Scale, Calculator } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function DimWeightHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the parcel's Length, Width and Height", description: "Measure the outside of the box at its longest points, in inches or centimetres; switch the unit next to the fields.", icon: Ruler },
                { title: "Enter the Actual Weight and pick the divisor", description: "The actual weight is the parcel on a scale. The divisor is the carrier's: 139 for UPS and FedEx daily rates in the US, 166 for USPS, 5,000 for most metric carriers.", icon: Scale },
                { title: "Read the dimensional and billable weight", description: "Dimensional weight is the volume divided by the divisor, rounded up. Billable weight is the higher of dimensional and actual weight, which is what the carrier charges on.", icon: Calculator }
            ]}
        />
    )
}

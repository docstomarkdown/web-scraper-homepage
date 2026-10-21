"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Table, Truck } from "lucide-react"

export function WeightConverterHowToUse() {
    return (
        <ToolSteps
            title="How to use this converter"
            steps={[
                { title: "Type the weight and pick its unit", description: "Enter the packed weight and choose pounds, ounces, kilograms or grams. The other three appear at once.", icon: Scale },
                { title: "Choose a carrier and a speed", description: "Pick the carrier and the service level you ship with. The converter looks up the weight band for that pair.", icon: Truck },
                { title: "Open the cost breakdown", description: "The breakdown shows the band the item falls in, the bands either side, and how much weight separates them.", icon: Table },
            ]}
        />
    )
}

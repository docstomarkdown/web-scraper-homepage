"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Table, Truck } from "lucide-react"

export function WeightConverterHowToUse() {
    return (
        <ToolSteps
            title="How to use this converter"
            steps={[
                { title: "Type the weight and pick its unit", description: "Enter the packed weight and choose pounds, ounces, kilograms or grams. The other three appear at once.", icon: Scale },
                { title: "Pick the unit you need", description: "Choose the target unit. It shows as the main result, with the other units below it.", icon: Truck },
                { title: "Check the carrier's rate card", description: "Carriers charge in weight steps that change every year. Look up the converted weight on your carrier's own rate card.", icon: Table },
            ]}
        />
    )
}

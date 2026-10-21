"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Layers, Ruler, Table, Truck } from "lucide-react"

export function ContainerLoadHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Choose the container", description: "Pick 20ft, 40ft or 40ft high cube, or type the interior length, width, height and weight limit of your own container.", icon: Truck },
                { title: "Choose loose or pallet loading", description: "Loose stacks cartons straight on the floor. Pallet loading first fills a pallet with cartons, then counts how many pallets fit.", icon: Layers },
                { title: "Type the carton size and weight", description: "Enter the carton's length, width, height and weight. Switch between metric and imperial with the toggle; the maths is the same.", icon: Ruler },
                { title: "Read the results", description: "You get the number of units, the arrangement that produced it, the total weight and the space used. If weight is the limit, the count says so.", icon: Table },
            ]}
        />
    )
}

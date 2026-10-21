"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Layers, Percent, Calculator } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function BundleHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter each product's Cost and Selling Price", description: "Two products are there to start; use Add Another Product for more. Cost is what the item costs you, selling price is what it sells for on its own.", icon: Layers },
                { title: "Choose how the bundle is priced", description: "Turn on the advanced options to take a percentage off the combined price, or to set a fixed bundle price. Leave them off to see the bundle at full price.", icon: Percent },
                { title: "Read the bundle's profit and margin", description: "Profit is the bundle price minus the combined cost. Margin is profit as a share of the bundle price. Compare it with each product's own margin before you launch.", icon: Calculator }
            ]}
        />
    )
}

"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function FBARemovalOverview() {
    return (
        <ToolOverview
            heading="Remove or dispose of stranded stock?"
            headingAccent="stranded stock"
            definition="Inventory that isn't selling costs storage every month and a surcharge after six months. Amazon can send it back to you for a removal fee or destroy it for a disposal fee. This calculator sets the profit from selling returned units elsewhere against the cost of disposing of them, and names the option that loses less or earns more."
            facts={[
                { stat: "5 inputs", label: "What you enter", detail: "Units, removal fee, disposal fee, expected selling price and other costs per unit." },
                { stat: "Your fees", label: "From Seller Central", detail: "Enter the removal and disposal fee per unit from Seller Central. When they're the same, the resale value decides." },
                { stat: "Remove or dispose", label: "What you get", detail: "The profit or loss of each path and the better choice." }
            ]}
            accent="red"
        />
    )
}

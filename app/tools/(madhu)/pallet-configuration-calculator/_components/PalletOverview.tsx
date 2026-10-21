"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function PalletOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Pallet Configuration Calculator tells you"
                headingAccent="Pallet Configuration Calculator"
                definition="Type a carton's size, pick a pallet and set the stack height your carrier or warehouse allows, and the calculator finds the arrangement that fits the most cartons per layer, how many layers stack, and the total. Add the carton weight to keep the load under the pallet's limit."
                facts={[
                    { stat: "Per layer", label: "best orientation", detail: "Cartons are tried both ways round; the arrangement with more per layer wins." },
                    { stat: "Layers", label: "within the height", detail: "The stack height minus the pallet's own 5.5 inches, divided by the carton height." },
                    { stat: "Total", label: "capped by weight", detail: "Per layer times layers, reduced if the weight limit is reached first." },
                ]}
            />
        </div>
    )
}

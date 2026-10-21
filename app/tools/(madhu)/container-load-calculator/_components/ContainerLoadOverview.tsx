"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function ContainerLoadOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Container Load Calculator tells you"
                headingAccent="Container Load Calculator"
                definition="Pick a container, type your carton size and weight, and the calculator counts how many fit, which way round they stack best, and what share of the space they fill. Switch to pallet loading to count cartons per pallet and pallets per container instead."
                facts={[
                    { stat: "Units", label: "that fit", detail: "The largest count of cartons the container holds by size, cut back if the weight limit is reached first." },
                    { stat: "Stacking", label: "best orientation", detail: "Cartons are tried both ways round on the floor; the arrangement with more units wins." },
                    { stat: "Space used", label: "as a percentage", detail: "Total carton volume divided by the container's volume, so you can see how much is left." },
                ]}
            />
        </div>
    )
}

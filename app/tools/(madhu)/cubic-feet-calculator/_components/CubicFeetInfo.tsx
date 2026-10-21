"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function CubicFeetInfo() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Cubic Feet Calculator tells you"
                headingAccent="Cubic Feet Calculator"
                definition="Storage fees and freight quotes are priced by volume. Type an item's length, width and height in inches, feet, centimetres or metres and the calculator gives its volume in cubic feet, cubic metres and cubic inches. Add a quantity and a rate per cubic foot to estimate the bill."
                facts={[
                    { stat: "4 units", label: "in", detail: "Inches, feet, centimetres or metres; every result shows in cubic feet, cubic metres and cubic inches." },
                    { stat: "Batches", label: "of identical items", detail: "Enter a quantity and the total volume multiplies with it." },
                    { stat: "Cost", label: "optional", detail: "A rate per cubic foot turns the volume into a storage or freight estimate." },
                ]}
            />
        </div>
    )
}

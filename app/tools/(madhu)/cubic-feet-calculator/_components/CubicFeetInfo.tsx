"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function CubicFeetInfo() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the cubic feet calculator tells you"
                headingAccent="cubic feet calculator"
                definition="Storage fees and freight quotes are priced by volume. Type an item's length, width and height in inches, feet, centimetres or metres and the calculator gives its volume in cubic feet, cubic metres, cubic inches and litres. It also works as a dimension converter: the same three sizes show in all four units. Add a quantity and a rate per cubic foot to estimate the bill."
                facts={[
                    { stat: "4 units", label: "in", detail: "Inches, feet, centimetres or metres in; the sizes come back in all four, with the volume in cubic feet, cubic metres, cubic inches and litres." },
                    { stat: "Batches", label: "of identical items", detail: "Enter a quantity and the total volume multiplies with it." },
                    { stat: "Cost", label: "optional", detail: "A rate per cubic foot turns the volume into a storage or freight estimate." },
                ]}
            />
        </div>
    )
}

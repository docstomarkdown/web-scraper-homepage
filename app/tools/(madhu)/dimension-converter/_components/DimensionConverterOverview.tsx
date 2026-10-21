"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this converter does, in plain words. Copy rules: docs/writing-style.md. */
export function DimensionConverterOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Dimension Converter does"
                headingAccent="Dimension Converter"
                definition="Marketplaces, carriers and suppliers each want sizes in their own unit. Type a product's three sizes once and the converter shows them in inches, centimetres, feet and metres, with the volume in each, so a listing, a freight form and a supplier spec can all be filled from one entry."
                facts={[
                    { stat: "3 sizes", label: "at once", detail: "Length, width and height convert together, so the set stays consistent." },
                    { stat: "4 units", label: "out", detail: "Inches, centimetres, feet and metres, each with the volume." },
                    { stat: "No rounding", label: "surprises", detail: "Two decimal places, from exact conversion factors." },
                ]}
            />
        </div>
    )
}

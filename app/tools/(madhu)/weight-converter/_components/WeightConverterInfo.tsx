"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this converter does, in plain words. Copy rules: docs/writing-style.md. */
export function WeightConverterInfo() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the product weight converter does"
                headingAccent="product weight converter"
                definition="Carriers, marketplaces and suppliers each ask for weight in their own unit. Type the weight in any unit and the converter shows it in pounds, ounces, kilograms and grams, so a shipping label, a listing and a supplier spec can all be filled from one entry."
                facts={[
                    { stat: "4 units", label: "at once", detail: "Pounds, ounces, kilograms and grams, from any one of them." },
                    { stat: "Exact", label: "factors", detail: "1 pound is 453.59237 grams and 1 ounce is 28.349523125 grams, by definition." },
                    { stat: "4 decimals", label: "in results", detail: "Enough precision for a label or a spec sheet; round up if a form wants whole numbers." },
                ]}
            />
        </div>
    )
}

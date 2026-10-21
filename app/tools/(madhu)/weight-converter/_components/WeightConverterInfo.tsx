"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this converter does, in plain words. Copy rules: docs/writing-style.md. */
export function WeightConverterInfo() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Product Weight Converter does"
                headingAccent="Product Weight Converter"
                definition="Carriers price by weight band, and a product that weighs 15.9 ounces costs less to ship than one that weighs 16.1. Type the weight in any unit and the converter shows it in pounds, ounces, kilograms and grams, then picks the band for the carrier and speed you choose and tells you how much you can add before the price steps up."
                facts={[
                    { stat: "4 units", label: "at once", detail: "Pounds, ounces, kilograms and grams, from any one of them." },
                    { stat: "Price band", label: "for your carrier", detail: "Which weight tier the item falls in, for the carrier and speed you pick." },
                    { stat: "Headroom", label: "before the next band", detail: "How much weight you can add, or must cut, to stay in the band." },
                ]}
            />
        </div>
    )
}

"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this validator does, in plain words. Copy rules: docs/writing-style.md. */
export function ValidatorInfo() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the UPC and EAN validator does"
                headingAccent="UPC and EAN validator"
                definition="Marketplaces reject listings with a bad barcode number, and the mistake is usually one mistyped digit. Type the number, or upload a photo of the label, and the validator recalculates the check digit, tells you whether it matches, and shows the working. For a catalogue, upload a CSV and get every code checked."
                facts={[
                    { stat: "Check digit", label: "recalculated", detail: "The last digit is worked out from the others and compared." },
                    { stat: "Working", label: "shown", detail: "Each step of the calculation, so you can see which digit is wrong." },
                    { stat: "Bulk", label: "from a CSV", detail: "Upload a CSV with a column of codes and download the results as a CSV." },
                ]}
            />
        </div>
    )
}

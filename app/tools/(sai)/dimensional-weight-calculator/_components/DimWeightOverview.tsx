"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function DimWeightOverview() {
    return (
        <ToolOverview
            heading="What weight will the carrier charge?"
            headingAccent="carrier charge"
            definition="Carriers charge on whichever is higher, the parcel's real weight or a weight worked out from its size. This calculator takes the box dimensions, the actual weight and your carrier's divisor and shows the dimensional weight and the billable weight you'll pay for."
            facts={[
                { stat: "L × W × H ÷ divisor", label: "The formula", detail: "A 20 × 16 × 12 in box at a divisor of 139 is 28 lb." },
                { stat: "Higher of the two", label: "Billable weight", detail: "The carrier bills the dimensional weight when it beats the real one." },
                { stat: "139 / 166 / 5,000", label: "Common divisors", detail: "UPS and FedEx daily, USPS, and metric carriers such as DHL." }
            ]}
            accent="amber"
        />
    )
}

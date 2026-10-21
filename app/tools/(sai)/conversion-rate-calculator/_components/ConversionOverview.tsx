"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function ConversionOverview() {
    return (
        <ToolOverview
            heading="How many visitors become customers?"
            headingAccent="customers"
            definition="Conversion rate is the share of visits that end in an order or another action you count. This calculator turns sessions and conversions from your analytics into the rate, and shows what a small change in it is worth, because a better rate adds orders from the traffic you already pay for."
            facts={[
                { stat: "2 inputs", label: "What you enter", detail: "Visitors (sessions) and conversions for the same period." },
                { stat: "1% to 3%", label: "Typical stores", detail: "Most online stores convert between one and three sessions in a hundred." },
                { stat: "+0.5 points", label: "What a lift is worth", detail: "At 10,000 sessions, half a point is 50 more orders a month." }
            ]}
            accent="emerald"
        />
    )
}

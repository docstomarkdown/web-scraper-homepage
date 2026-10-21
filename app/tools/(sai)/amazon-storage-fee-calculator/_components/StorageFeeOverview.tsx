"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function StorageFeeOverview() {
    return (
        <ToolOverview
            heading="What does FBA storage cost?"
            headingAccent="storage"
            definition="Amazon charges for the space your inventory takes each month, at a rate that more than doubles from October to December. This calculator turns a box's dimensions, the units you keep in stock and the months they stay into the monthly fee and the total, including the long-term surcharge after six months."
            facts={[
                { stat: "Per cubic foot", label: "How it's charged", detail: "Length × width × height ÷ 1,728, times the units, times the month's rate." },
                { stat: "$0.87 → $2.40", label: "The seasonal jump", detail: "Standard-size rates for January to September and October to December." },
                { stat: "+$1.50 / month", label: "After six months", detail: "Long-term storage adds a surcharge per cubic foot for every extra month." }
            ]}
            accent="amber"
        />
    )
}

"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function LeadTimeOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Lead Time Calculator tells you"
                headingAccent="Lead Time Calculator"
                definition="Lead time is the days between placing an order and having the goods ready to sell. Type the supplier's production time, the shipping time and a buffer for delays, and the calculator gives the total and the arrival date. It's the number your reorder point and your days-of-inventory runway depend on."
                facts={[
                    { stat: "Total days", label: "end to end", detail: "Supplier time plus shipping plus buffer." },
                    { stat: "Arrival date", label: "from today", detail: "The calendar date stock lands if you order now." },
                    { stat: "Share", label: "of each part", detail: "Which part of the wait is longest, so you know where to push." },
                ]}
            />
        </div>
    )
}

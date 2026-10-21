"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function DaysOfInventoryOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Days of Inventory Calculator tells you"
                headingAccent="Days of Inventory Calculator"
                definition="Type the units in stock and the units you sell a day, and the calculator tells you how many days until you run out. Add a safety buffer to see the days you can sell before you touch it. Use the number to time your next order."
                facts={[
                    { stat: "Days left", label: "at today's pace", detail: "Stock on hand divided by daily sales, as whole days." },
                    { stat: "Usable days", label: "above the buffer", detail: "The same figure after the safety stock is set aside." },
                    { stat: "Order timing", label: "when to reorder", detail: "Compare the days left with your supplier's lead time; if lead time is longer, order now." },
                ]}
            />
        </div>
    )
}

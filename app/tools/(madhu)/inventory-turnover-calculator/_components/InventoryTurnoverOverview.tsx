"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function InventoryTurnoverOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Inventory Turnover Calculator tells you"
                headingAccent="Inventory Turnover Calculator"
                definition="Inventory turnover is how many times you sell and replace your stock in a period. Type the cost of goods sold, the opening and closing inventory values and the period in days, and the calculator gives the ratio and the days sales of inventory. A higher ratio means stock moves faster and ties up less cash."
                facts={[
                    { stat: "Turnover", label: "times per period", detail: "Cost of goods sold divided by average inventory." },
                    { stat: "Days", label: "to sell through", detail: "The period's days divided by the turnover, so a ratio of 5 over a year is 73 days." },
                    { stat: "Trend", label: "to watch", detail: "Run it each quarter; a falling ratio means stock is building up." },
                ]}
            />
        </div>
    )
}

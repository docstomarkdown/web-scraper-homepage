"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function InventoryTurnoverOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the inventory turnover calculator tells you"
                headingAccent="inventory turnover calculator"
                definition="Inventory turnover is how many times you sell and replace your stock in a period. Type the cost of goods sold, the opening and closing inventory values and the period in days, and the calculator gives the ratio and the days sales of inventory. A higher ratio means stock moves faster and ties up less cash. Switch to Days of stock left to see the days of inventory your current stock covers at today's sales rate, and when to order."
                facts={[
                    { stat: "Turnover", label: "times per period", detail: "Cost of goods sold divided by average inventory." },
                    { stat: "Days", label: "to sell through", detail: "The period's days divided by the turnover, so a ratio of 5 over a year is 73 days." },
                    { stat: "Days of stock left", label: "at today's pace", detail: "Units in stock divided by units sold a day, with the usable days above your safety buffer." },
                    { stat: "Trend", label: "to watch", detail: "Run it each quarter; a falling ratio means stock is building up. The year figure lets a month compare with a year." },
                ]}
            />
        </div>
    )
}

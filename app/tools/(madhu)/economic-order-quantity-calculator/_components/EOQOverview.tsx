"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function EOQOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the EOQ Calculator tells you"
                headingAccent="EOQ Calculator"
                definition="Every order costs something to place, and every unit in stock costs something to hold. Type your annual demand, the cost of placing an order and the yearly holding cost per unit, and the calculator finds the order size where the two costs add up to the least. It also shows the orders a year and the days between them."
                facts={[
                    { stat: "EOQ", label: "units per order", detail: "The order size with the lowest total of ordering and holding cost." },
                    { stat: "Orders", label: "a year", detail: "Annual demand divided by the EOQ, with the days between orders." },
                    { stat: "Total cost", label: "at the EOQ", detail: "Ordering cost plus holding cost for the year, so you can compare against what you do now." },
                ]}
            />
        </div>
    )
}

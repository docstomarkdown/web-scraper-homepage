"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function COGSOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the COGS Calculator tells you"
                headingAccent="COGS Calculator"
                definition="Cost of goods sold is everything it costs to get one sellable unit into a customer's hands. Type the product cost, the inbound shipping, the packaging and the fulfilment fee, and the calculator gives the cost per unit and the total for the quantity you order."
                facts={[
                    { stat: "Per unit", label: "all-in cost", detail: "Product, shipping, packaging and fulfilment added up for one unit." },
                    { stat: "Total", label: "for the order", detail: "The per-unit cost multiplied by the quantity, which is the cash the order ties up." },
                    { stat: "Price check", label: "before you list", detail: "Compare the per-unit cost with your selling price to see the gross margin you'd keep." },
                ]}
            />
        </div>
    )
}

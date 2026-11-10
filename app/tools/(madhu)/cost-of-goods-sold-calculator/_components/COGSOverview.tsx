"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function COGSOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the COGS Calculator tells you"
                headingAccent="COGS Calculator"
                definition="This calculator works out cost of goods sold per unit: everything it costs to get one sellable unit into a customer's hands, also called landed cost. Type the product cost, the inbound shipping, the packaging and the fulfilment fee, and it gives the cost per unit and the total for the quantity you order. It is not the period figure on a profit and loss (opening inventory + purchases − closing inventory)."
                facts={[
                    { stat: "Per unit", label: "all-in cost", detail: "Product, shipping, packaging and fulfilment added up for one unit." },
                    { stat: "Total", label: "for the order", detail: "The per-unit cost multiplied by the quantity, which is the cash the order ties up." },
                    { stat: "Price check", label: "before you list", detail: "Add your selling price to see the gross margin you'd keep." },
                ]}
            />
        </div>
    )
}

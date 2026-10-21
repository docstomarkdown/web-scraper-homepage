"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function LandedCostOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the landed cost calculator does"
                definition="It adds shipping, duty, insurance and fees to the supplier's price and divides by the units, so you see what one item costs once it is in your warehouse. That is the number to price from."
                accent="blue"
                facts={[
                    { stat: "5 costs", label: "In one figure", detail: "Product, shipping, duty, insurance and other fees. Duty is a percentage of the product value; the rest are flat amounts for the shipment." },
                    { stat: "Per unit", label: "The price to margin from", detail: "Total landed cost ÷ units. Supplier quotes leave out a third or more of what you'll pay." },
                    { stat: "Compare quotes", label: "Sea against air, supplier against supplier", detail: "Run each quote through and compare the landed cost per unit, not the freight bill." },
                ]}
            />
        </div>
    )
}

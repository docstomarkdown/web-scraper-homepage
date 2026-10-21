"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function WholesalePriceOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the wholesale price calculator does"
                definition="It takes your cost per unit, adds any tax or duty, and works out the wholesale price that leaves the margin you need, with the markup and profit per unit that price implies."
                accent="blue"
                facts={[
                    { stat: "Effective cost", label: "Cost × (1 + tax rate)", detail: "Include inbound shipping and anything else you pay to have the unit ready to sell." },
                    { stat: "Wholesale price", label: "Cost ÷ (1 − margin)", detail: "A $10 cost at a 40% margin is $16.67. Margin is profit ÷ price, markup is profit ÷ cost." },
                    { stat: "30% to 50%", label: "Typical wholesale margins", detail: "Leaves the retailer room to roughly double the price. If your price lands above the market, the cost has to move." },
                ]}
            />
        </div>
    )
}

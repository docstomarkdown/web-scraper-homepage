"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function MercariFeeOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the Mercari fee calculator does"
                definition="It takes Mercari's two fees and your own costs off a sale price and shows the profit you keep, the margin, and the total for several identical items."
                accent="blue"
                facts={[
                    { stat: "10%", label: "Selling fee", detail: "Charged on the sale price of every item that sells. Listing is free." },
                    { stat: "2.9% + $0.50", label: "Payment fee", detail: "Charged on the amount the buyer pays, on top of the selling fee. Together the two come to about 13%." },
                    { stat: "Your costs", label: "Item, shipping, packaging", detail: "Enter what you paid and the label if you cover it, and the result is your real profit." },
                ]}
            />
        </div>
    )
}

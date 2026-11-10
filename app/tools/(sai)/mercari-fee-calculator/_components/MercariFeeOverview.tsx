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
                    { stat: "10%", label: "Selling fee", detail: "Charged on the item price plus any shipping the buyer pays. Listing is free." },
                    { stat: "$0", label: "Processing fee", detail: "Mercari dropped the seller payment fee on 6 January 2025, so the 10% is the whole fee on a sale." },
                    { stat: "Your costs", label: "Item, shipping, packaging", detail: "Enter what you paid and the label if you cover it, and the result is your real profit." },
                ]}
            />
        </div>
    )
}

"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function TACoSOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the TACoS calculator does"
                definition="It divides ad spend by all your sales, paid and organic, and shows the margin left after ads. A falling TACoS while sales grow means organic sales are carrying more of the business."
                accent="blue"
                facts={[
                    { stat: "TACoS", label: "Ad spend ÷ total revenue", detail: "The share of everything you sell that goes to ads, not only the sales the ads produced." },
                    { stat: "Margin after ads", label: "Gross margin − TACoS", detail: "What is left after ads. The health meter compares TACoS with your margin." },
                    { stat: "Under 30%", label: "Of your margin is healthy", detail: "Between 30% and 60% needs watching; above that, ads are taking most of the profit." },
                ]}
            />
        </div>
    )
}

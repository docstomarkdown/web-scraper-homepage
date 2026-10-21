"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function PackagingCostOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the packaging cost calculator does"
                definition="It adds the box, padding, tape, label and inserts to the minutes it takes to pack an order and gives you packaging cost per order and per batch. Most sellers leave this out of their pricing."
                accent="blue"
                facts={[
                    { stat: "Materials", label: "Box, padding, tape, label, inserts", detail: "Each as a cost per order. Mailers cost less than boxes for anything that won't break." },
                    { stat: "Labour", label: "Minutes ÷ 60 × hourly wage", detail: "Three minutes at $15 an hour is $0.75 per order, whether you pay someone or do it yourself." },
                    { stat: "Per batch", label: "Cost per order × orders", detail: "See what a month of orders costs to pack before you set prices or hire help." },
                ]}
            />
        </div>
    )
}
